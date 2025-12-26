import React from 'react';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/layout/GlassCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MedicalDisclaimer } from '../components/shared/MedicalDisclaimer';
import { 
  Activity, 
  Users, 
  Clock, 
  Award,
  ChevronRight,
  Stethoscope,
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';
import { mockDoctors, leaderboardDoctors } from '../mocks/doctors';

export const Home: React.FC = () => {
  const stats = [
    { 
      label: 'Active Doctors', 
      value: '2,847', 
      change: '+12%',
      icon: <Users className="w-6 h-6 text-primary-600" />,
      description: 'Verified medical professionals'
    },
    { 
      label: 'Analyses Today', 
      value: '1,243', 
      change: '+8%',
      icon: <Activity className="w-6 h-6 text-primary-600" />,
      description: 'AI-assisted diagnostics'
    },
    { 
      label: 'Avg Response Time', 
      value: '2.4s', 
      change: '-15%',
      icon: <Clock className="w-6 h-6 text-primary-600" />,
      description: 'AI processing speed'
    },
    { 
      label: 'Accuracy Rate', 
      value: '96.2%', 
      change: '+0.5%',
      icon: <Award className="w-6 h-6 text-primary-600" />,
      description: 'Validated by clinicians'
    },
  ];

  const features = [
    {
      title: 'AI-Powered Diagnostics',
      description: 'Advanced image analysis with TorchXRayVision models trained on 2M+ chest X-rays',
      icon: <Brain className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Clinical Decision Support',
      description: 'Evidence-based recommendations and differential diagnosis assistance',
      icon: <Stethoscope className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security and patient privacy protection',
      icon: <Shield className="w-8 h-8 text-primary-600" />
    },
    {
      title: 'Real-time Processing',
      description: 'Instant analysis results with visual explanations using Grad-CAM',
      icon: <Zap className="w-8 h-8 text-primary-600" />
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-white dark:from-neutral-900 dark:to-neutral-950 py-20">
        <Container size="narrow" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trusted by 500+ Hospitals
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              AI-Powered Healthcare, 
              <span className="text-primary-600"> Human-Centered</span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Advanced diagnostic support platform designed for medical professionals. 
              Harnessing AI to enhance clinical decision-making while maintaining the highest standards of care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" leftIcon={<Zap className="w-5 h-5" />}>
                Start Free Trial
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<ChevronRight className="w-5 h-5" />}
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
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
                      <span className={`text-sm ${parseInt(stat.change) >= 0 ? 'text-success-600' : 'text-error-600'}`}>
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

      {/* What We Do */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We combine cutting-edge AI with clinical expertise to support healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift">
                <div className="p-2 inline-flex rounded-lg bg-primary-50 dark:bg-primary-900/30 mb-4">
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

      {/* Clinical Network */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Join Our Clinical Network
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                Connect with leading medical professionals and access our AI tools
              </p>
              <Button size="lg">
                Join as a Medical Professional
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="lg:w-1/2">
              <MedicalDisclaimer />
            </div>
          </div>

          {/* Doctor Leaderboard */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Top Performing Doctors
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Based on accuracy, response time, and patient satisfaction
              </p>
            </div>
            
            {/* Podium */}
            <div className="p-6 bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-900/10">
              <div className="flex items-end justify-center space-x-4">
                {/* 2nd place */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-warning-500 overflow-hidden mb-2">
                    <img 
                      src={leaderboardDoctors[1].avatarUrl} 
                      alt={leaderboardDoctors[1].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {leaderboardDoctors[1].name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {leaderboardDoctors[1].specialty}
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{leaderboardDoctors[1].rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 bg-warning-500 text-white px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                </div>

                {/* 1st place */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-4 border-primary-500 overflow-hidden mb-2">
                    <img 
                      src={leaderboardDoctors[0].avatarUrl} 
                      alt={leaderboardDoctors[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {leaderboardDoctors[0].name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {leaderboardDoctors[0].specialty}
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{leaderboardDoctors[0].rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 bg-primary-500 text-white px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                </div>

                {/* 3rd place */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-neutral-400 overflow-hidden mb-2">
                    <img 
                      src={leaderboardDoctors[2].avatarUrl} 
                      alt={leaderboardDoctors[2].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {leaderboardDoctors[2].name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {leaderboardDoctors[2].specialty}
                    </p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-semibold">{leaderboardDoctors[2].rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 bg-neutral-500 text-white px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 dark:bg-neutral-900">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Doctor
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Specialty
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Hospital
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Experience
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {mockDoctors.slice(3).map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={doctor.avatarUrl} 
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-white">
                              {doctor.name}
                            </p>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${doctor.isOnline ? 'bg-success-500' : 'bg-neutral-300'}`} />
                              <span className="text-sm text-neutral-500">
                                {doctor.isOnline ? 'Online' : 'Offline'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">
                          {doctor.specialty}
                        </Badge>
                      </td>
                      <td className="p-4 text-neutral-600 dark:text-neutral-400">
                        {doctor.hospital}
                      </td>
                      <td className="p-4 text-neutral-600 dark:text-neutral-400">
                        {doctor.experience} years
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 font-medium">{doctor.rating}</span>
                          <span className="ml-2 text-sm text-neutral-500">
                            ({doctor.consultations} consults)
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};