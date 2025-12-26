import React from 'react';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/layout/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Brain,
  MessageSquare,
  Mic,
  BarChart3,
  Code,
  Shield,
  Zap,
  Lock,
  Users,
  Globe,
  Cloud,
  Cpu,
  Database,
  Server,
  Terminal,
  FileText,
  Video,
  Calendar,
  Bell
} from 'lucide-react';

export const Features: React.FC = () => {
  const mainFeatures = [
    {
      id: 'image-analysis',
      title: 'AI Image Analysis',
      description: 'Advanced diagnostic support for medical imaging using TorchXRayVision models trained on 2M+ chest X-rays.',
      icon: <Brain className="w-8 h-8 text-primary-600" />,
      highlights: [
        '18+ pathology detection',
        'Grad-CAM visual explanations',
        'Real-time processing',
        'DICOM support'
      ],
      isComingSoon: false
    },
    {
      id: 'chat-assistant',
      title: 'Medical Chat Assistant',
      description: '24/7 AI-powered medical guidance with symptom checking and evidence-based recommendations.',
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />,
      highlights: [
        'Natural language processing',
        'HIPAA-compliant',
        'Emergency triage',
        'Multi-language support'
      ],
      isComingSoon: false
    },
    {
      id: 'voice-to-text',
      title: 'Voice-to-Text Medical Notes',
      description: 'Accurate speech recognition for clinical documentation with medical terminology support.',
      icon: <Mic className="w-8 h-8 text-primary-600" />,
      highlights: [
        '99% accuracy rate',
        'Real-time transcription',
        'Medical terminology',
        'Integration with EHR'
      ],
      isComingSoon: true
    },
    {
      id: 'analytics',
      title: 'Clinical Analytics Dashboard',
      description: 'Comprehensive data visualization and insights for healthcare performance metrics.',
      icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
      highlights: [
        'Real-time analytics',
        'Predictive modeling',
        'Custom reports',
        'Export capabilities'
      ],
      isComingSoon: false
    },
    {
      id: 'code-generator',
      title: 'AI Medical Code Generator',
      description: 'Automatic ICD-10 and CPT code suggestions based on clinical notes and diagnoses.',
      icon: <Code className="w-8 h-8 text-primary-600" />,
      highlights: [
        'ICD-10 automation',
        'CPT code suggestions',
        'Billing optimization',
        'Compliance checking'
      ],
      isComingSoon: true
    },
    {
      id: 'security',
      title: 'Enterprise Security Suite',
      description: 'End-to-end encryption, access controls, and compliance tools for healthcare organizations.',
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      highlights: [
        'HIPAA compliance',
        'End-to-end encryption',
        'Access auditing',
        'Data backup'
      ],
      isComingSoon: false
    }
  ];

  const techFeatures = [
    {
      title: 'High Availability',
      description: '99.9% uptime SLA with global CDN',
      icon: <Globe className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Scalable Infrastructure',
      description: 'Auto-scaling for millions of requests',
      icon: <Cloud className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'GPU Acceleration',
      description: 'NVIDIA CUDA for AI inference',
      icon: <Cpu className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Data Lakes',
      description: 'Secure medical data storage',
      icon: <Database className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'API First',
      description: 'RESTful APIs for integration',
      icon: <Server className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'CLI Tools',
      description: 'Command-line interface for devs',
      icon: <Terminal className="w-6 h-6 text-primary-600" />
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Container>
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Enterprise Features
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Comprehensive Healthcare Platform
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Everything you need to enhance clinical workflows, improve diagnostics, 
            and deliver better patient care.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature) => (
            <GlassCard
              key={feature.id}
              className="p-6 hover-lift"
              hoverable
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30">
                  {feature.icon}
                </div>
                {feature.isComingSoon && (
                  <Badge variant="outline">Coming Soon</Badge>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-3" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <Button variant="ghost" className="w-full mt-6">
                Learn More
              </Button>
            </GlassCard>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Built for scale, security, and performance
            </p>
          </div>

          <GlassCard className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techFeatures.map((feature, index) => (
                <div key={index} className="flex items-start p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-300 transition-colors">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Integration Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Integration Partners
          </h2>
          
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {['Epic', 'Cerner', 'Allscripts', 'Athenahealth', 'Meditech', 'NextGen'].map((partner) => (
                <div
                  key={partner}
                  className="flex items-center justify-center p-6 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-primary-300 transition-colors"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                      <Database className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* CTA Section */}
        <GlassCard className="p-12 bg-gradient-to-r from-primary-50 to-white dark:from-primary-900/20 dark:to-neutral-800 text-center">
          <Lock className="w-16 h-16 text-primary-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Join leading hospitals and clinics using HealthCare+ to enhance patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg">
              Request Enterprise Demo
            </Button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            No credit card required • 30-day free trial • HIPAA compliant
          </p>
        </GlassCard>
      </Container>
    </div>
  );
};