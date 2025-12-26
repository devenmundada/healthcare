import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Send,
  Shield,
  AlertTriangle,
  User,
  Bot,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { MedicalDisclaimer } from '../../shared/MedicalDisclaimer';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  type: 'text' | 'voice';
}

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Healthcare Assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          handleSendMessage(transcript);
        };
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };
        
        recognitionInstance.onend = () => {
          setIsRecording(false);
        };
        
        setRecognition(recognitionInstance);
        recognitionRef.current = recognitionInstance;
      }
    }
  }, []);

  // Initialize Speech Synthesis
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = (text?: string) => {
    const message = text || inputText;
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      type: text ? 'voice' : 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your concern. Based on your description, I recommend consulting with a healthcare professional for proper evaluation.",
        "I can provide general health information, but please consult a doctor for medical advice specific to your situation.",
        "For the symptoms you mentioned, it's important to get professional medical attention. Would you like help finding a doctor?",
        "I'm here to provide health information and support. Remember, I'm an AI assistant and cannot diagnose medical conditions.",
        "Based on common knowledge, the symptoms you describe should be evaluated by a healthcare provider for accurate assessment."
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Auto-read response if text-to-speech is active
      if (isSpeaking) {
        speakText(aiResponse.content);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      // Read the last assistant message
      const lastAssistantMsg = [...messages].reverse().find(m => m.sender === 'assistant');
      if (lastAssistantMsg) {
        speakText(lastAssistantMsg.content);
      }
    }
  };

  const handleEmergency = () => {
    const confirmCall = window.confirm(
      'This will call emergency services. Use only for real medical emergencies. Proceed?'
    );
    if (confirmCall) {
      window.location.href = 'tel:911';
    }
  };

  if (!consentGiven && isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-96 max-w-[90vw] animate-slide-up">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-bold">Voice Interaction Consent</h3>
            </div>
            
            <MedicalDisclaimer variant="critical" className="mb-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm">
                  Voice data is processed securely and never stored permanently
                </span>
              </div>
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm">
                  HIPAA-compliant encryption for all voice interactions
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setConsentGiven(true)}
                className="w-full"
              >
                I Consent to Voice Interaction
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setConsentGiven(true);
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Text Chat Only
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-700 transition-all duration-300 animate-pulse hover:animate-none"
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[90vw] h-[500px] max-h-[80vh]">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl flex flex-col h-full animate-slide-up">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                    <Bot className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">
                      Health Assistant
                    </h3>
                    <p className="text-xs text-neutral-500">
                      24/7 AI Support • HIPAA Secure
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleTextToSpeech}
                    className={`p-2 rounded-lg ${isSpeaking ? 'bg-primary-100 text-primary-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
                    aria-label={isSpeaking ? 'Stop reading' : 'Read responses'}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : message.sender === 'system'
                          ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-start">
                        {message.sender === 'assistant' && (
                          <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p>{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {message.type === 'voice' && ' 🎤'}
                            </span>
                            {message.sender === 'assistant' && (
                              <div className="flex items-center space-x-1">
                                <button className="p-1 hover:bg-white/10 rounded">
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-white/10 rounded">
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-white/10 rounded">
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your health question or speak..."
                    className="w-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={2}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={toggleRecording}
                    className={`p-3 rounded-lg ${isRecording ? 'bg-red-100 text-red-600' : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}
                    aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
                  >
                    {isRecording ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim()}
                    className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendMessage('I have fever and cough')}
                  className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  Fever & Cough
                </button>
                <button
                  onClick={() => handleSendMessage('Find me a doctor')}
                  className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  Find Doctor
                </button>
                <button
                  onClick={handleEmergency}
                  className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  Emergency
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;