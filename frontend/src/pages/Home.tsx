import React, { useState, useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/layout/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { MedicalDisclaimer } from '../components/shared/MedicalDisclaimer';
import { VoiceAnalyzer } from '../components/features/home/VoiceAnalyzer';
import { WeatherNotifications } from '../components/features/home/WeatherNotifications';
import AppointmentBookingModal from '../components/features/appointment/AppointmentBookingModal';
import { 
  Users, 
  Activity, 
  Clock, 
  Award,
  ChevronRight,
  Stethoscope,
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Star,
  Calendar,
  Phone,
  Video,
  MapPin,
  AlertTriangle,
  Heart,
  MessageSquare,
  ThumbsUp,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Thermometer,
  Wind,
  Cloud,
  Bell,
  Mic,
  Play,
  Pause,
  Download,
  Share2
} from 'lucide-react';

export const Home: React.FC = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<any>(null);

  const stats = [
    { 
      label: 'Active Doctors', 
      value: '500+', 
      change: '+12%',
      icon: <Users className="w-6 h-6 text-primary-600" />,
      description: 'Verified medical professionals'
    },
    { 
      label: 'Success Rate', 
      value: '98.2%', 
      change: '+0.8%',
      icon: <Award className="w-6 h-6 text-primary-600" />,
      description: 'Patient satisfaction'
    },
    { 
      label: 'Avg. Response Time', 
      value: '2.4s', 
      change: '-15%',
      icon: <Clock className="w-6 h-6 text-primary-600" />,
      description: 'AI processing speed'
    },
    { 
      label: 'Emergency Cases', 
      value: '1.2K', 
      change: '-8%',
      icon: <Activity className="w-6 h-6 text-primary-600" />,
      description: 'Handled this month'
    },
  ];

  const features = [
    {
      title: 'AI-Powered Diagnostics',
      description: 'Advanced medical imaging analysis with 96% clinical accuracy',
      icon: <Brain className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Voice Health Analysis',
      description: 'Analyze voice patterns for wellness insights and emotional state',
      icon: <Mic className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Real-time Appointment',
      description: 'Instant booking with automatic calendar sync and reminders',
      icon: <Calendar className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Emergency Response',
      description: '24/7 emergency support with location-based services',
      icon: <AlertTriangle className="w-8 h-8 text-primary-600" />
    },
  ];

  const successStories = [
    {
      id: 1,
      patient: 'Robert Chen',
      age: 45,
      condition: 'Cardiac Arrhythmia',
      story: 'Early detection through AI analysis saved my life. The platform connected me with a specialist within hours.',
      doctor: 'Dr. Sarah Chen',
      hospital: 'Mayo Clinic',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    {
      id: 2,
      patient: 'Maria Garcia',
      age: 32,
      condition: 'Early-stage Cancer',
      story: 'The AI assistant noticed patterns in my symptoms that I had overlooked. Early treatment made all the difference.',
      doctor: 'Dr. James Wilson',
      hospital: 'Johns Hopkins',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    {
      id: 3,
      patient: 'David Park',
      age: 58,
      condition: 'Chronic Diabetes',
      story: 'Continuous monitoring and AI-powered insights helped me manage my condition effectively.',
      doctor: 'Dr. Emma Johnson',
      hospital: 'Cleveland Clinic',
      rating: 4,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Heart Health: Preventive Measures',
      author: 'Dr. Sarah Chen',
      date: 'Jan 15, 2024',
      readTime: '5 min read',
      category: 'Cardiology',
      excerpt: 'Learn about the latest preventive measures for maintaining optimal heart health...'
    },
    {
      id: 2,
      title: 'AI in Early Cancer Detection',
      author: 'Dr. Michael Rodriguez',
      date: 'Jan 12, 2024',
      readTime: '7 min read',
      category: 'Oncology',
      excerpt: 'How artificial intelligence is revolutionizing early cancer detection methods...'
    },
    {
      id: 3,
      title: 'Mental Health in Digital Age',
      author: 'Dr. Lisa Wang',
      date: 'Jan 10, 2024',
      readTime: '6 min read',
      category: 'Psychiatry',
      excerpt: 'Managing mental health with the help of digital tools and AI assistance...'
    }
  ];

  const dailyTips = [
    'Stay hydrated - Drink at least 8 glasses of water daily',
    'Get 7-8 hours of quality sleep each night',
    'Include 30 minutes of moderate exercise in your daily routine',
    'Practice mindfulness meditation for 10 minutes daily',
    'Schedule regular health check-ups, even when feeling well'
  ];

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-blue-950/30 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trusted by 500+ Hospitals
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                Your Health, 
                <span className="text-primary-600"> Our Priority</span>
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                AI-powered healthcare platform connecting you with trusted medical professionals. 
                From instant consultations to advanced diagnostics, we're here for your health journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  leftIcon={<Calendar className="w-5 h-5" />}
                  onClick={() => setShowAppointmentModal(true)}
                >
                  Book an Appointment
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<Video className="w-5 h-5" />}
                >
                  Video Consultation
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">AI Support</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600">500+</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Doctors</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              
              <GlassCard className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    Start Your Health Journey
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Get personalized health insights in minutes
                  </p>
                  
                  <div className="space-y-4">
                    <Button variant="secondary" fullWidth leftIcon={<Stethoscope className="w-4 h-4" />}>
                      Health Assessment
                    </Button>
                    <Button variant="secondary" fullWidth leftIcon={<MessageSquare className="w-4 h-4" />}>
                      Chat with AI Assistant
                    </Button>
                    <Button variant="ghost" fullWidth leftIcon={<MapPin className="w-4 h-4" />}>
                      Find Nearby Hospitals
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </Container>
      </section>

      {/* Voice Analyzer Section */}
      <section className="py-12">
        <Container>
          <VoiceAnalyzer />
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassCard key={index} hoverable className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm ${parseInt(stat.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-neutral-500 ml-2">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Everything you need for complete healthcare management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift p-6">
                <div className="p-3 inline-flex rounded-lg bg-primary-50 dark:bg-primary-900/30 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                Patient Success Stories
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Real stories from patients who found hope and healing
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={prevStory}
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextStory}
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary-100">
                    <img 
                      src={successStories[currentStoryIndex].image} 
                      alt={successStories[currentStoryIndex].patient}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < successStories[currentStoryIndex].rating ? 'text-yellow-500 fill-current' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-2xl italic text-neutral-700 dark:text-neutral-300 mb-6">
                    "{successStories[currentStoryIndex].story}"
                  </blockquote>
                  <div>
                    <h4 className="font-bold text-lg text-neutral-900 dark:text-white">
                      {successStories[currentStoryIndex].patient}, {successStories[currentStoryIndex].age}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {successStories[currentStoryIndex].condition} • Treated by {successStories[currentStoryIndex].doctor}
                    </p>
                    <p className="text-sm text-neutral-500 mt-2">
                      {successStories[currentStoryIndex].hospital}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* Weather & Notifications */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <Container>
          <WeatherNotifications />
        </Container>
      </section>

      {/* Blog & Daily Tips */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medical Blog */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Medical Insights & Blog
              </h2>
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover-lift p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{post.category}</Badge>
                      <span className="text-sm text-neutral-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                          <Stethoscope className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <span className="text-sm text-neutral-500">{post.readTime}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Daily Health Tips */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Daily Health Tips
              </h2>
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 mr-4">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">
                      Today's Wellness Focus
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {dailyTips.map((tip, index) => (
                    <div key={index} className="flex items-start p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold text-green-600 dark:text-green-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full mt-6" leftIcon={<Bell className="w-4 h-4" />}>
                  Enable Daily Reminders
                </Button>
              </Card>

              {/* Emergency Quick Access */}
              <Card className="p-6 mt-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 mr-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">
                      Emergency Access
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Quick help when you need it most
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="error" fullWidth leftIcon={<Phone className="w-4 h-4" />}>
                    Call Emergency (911)
                  </Button>
                  <Button variant="secondary" fullWidth leftIcon={<MapPin className="w-4 h-4" />}>
                    Find Nearest Hospital
                  </Button>
                  <Button variant="ghost" fullWidth leftIcon={<Users className="w-4 h-4" />}>
                    Emergency Contacts
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-12">
        <Container>
          <MedicalDisclaimer variant="critical" />
        </Container>
      </section>

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </div>
  );
};