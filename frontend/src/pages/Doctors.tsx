import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { MedicalCard } from '../components/ui/MedicalCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Toggle } from '../components/ui/Toggle';
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Phone,
  Video,
  Calendar,
  Award,
  Shield,
  Globe,
  Heart,
  Users,
  TrendingUp,
  ChevronDown,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  subSpecialty?: string;
  qualifications: string[];
  experience: number;
  rating: number;
  totalRatings: number;
  consultationFee: number;
  languages: string[];
  availability: {
    online: boolean;
    inPerson: boolean;
    emergency: boolean;
  };
  hospital: {
    name: string;
    city: string;
    distance?: string;
  };
  schedule: {
    days: string[];
    hours: string;
  };
  successRate: number;
  responseTime: string;
  verified: boolean;
  photoUrl: string;
  bio: string;
  patientReviews: Review[];
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Oncology',
    'Psychiatry',
    'Gynecology',
    'Urology',
    'Endocrinology',
    'Gastroenterology'
  ];

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialization: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      qualifications: ['MD, Cardiology', 'FACC', 'Board Certified'],
      experience: 15,
      rating: 4.9,
      totalRatings: 1247,
      consultationFee: 200,
      languages: ['English', 'Mandarin', 'Spanish'],
      availability: {
        online: true,
        inPerson: true,
        emergency: true
      },
      hospital: {
        name: 'Mayo Clinic',
        city: 'Rochester, MN',
        distance: '5 miles'
      },
      schedule: {
        days: ['Mon', 'Wed', 'Fri'],
        hours: '9:00 AM - 5:00 PM'
      },
      successRate: 96,
      responseTime: 'Under 2 hours',
      verified: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
      bio: 'Leading cardiologist with 15+ years experience in interventional procedures. Specializes in complex coronary interventions.',
      patientReviews: [
        {
          id: 'r1',
          patientName: 'John M.',
          rating: 5,
          date: '2024-01-15',
          comment: 'Dr. Chen saved my life with timely intervention. Highly professional and caring.',
          verified: true
        }
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialization: 'Neurology',
      subSpecialty: 'Epilepsy Specialist',
      qualifications: ['MD, Neurology', 'FAAN', 'Epilepsy Board Certified'],
      experience: 12,
      rating: 4.8,
      totalRatings: 987,
      consultationFee: 180,
      languages: ['English', 'Spanish'],
      availability: {
        online: true,
        inPerson: true,
        emergency: false
      },
      hospital: {
        name: 'Johns Hopkins Hospital',
        city: 'Baltimore, MD',
        distance: '12 miles'
      },
      schedule: {
        days: ['Tue', 'Thu', 'Sat'],
        hours: '10:00 AM - 6:00 PM'
      },
      successRate: 94,
      responseTime: 'Under 4 hours',
      verified: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelRodriguez',
      bio: 'Epilepsy specialist with extensive research background. Focuses on personalized treatment plans.',
      patientReviews: []
    },
    {
      id: '3',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedics',
      subSpecialty: 'Spinal Surgery',
      qualifications: ['MD, Orthopedic Surgery', 'FAAOS'],
      experience: 20,
      rating: 4.9,
      totalRatings: 1563,
      consultationFee: 300,
      languages: ['English'],
      availability: {
        online: false,
        inPerson: true,
        emergency: true
      },
      hospital: {
        name: 'Cleveland Clinic',
        city: 'Cleveland, OH',
        distance: '8 miles'
      },
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        hours: '8:00 AM - 4:00 PM'
      },
      successRate: 98,
      responseTime: 'Under 6 hours',
      verified: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamesWilson',
      bio: 'Renowned spinal surgeon with 20+ years experience. Performs minimally invasive procedures.',
      patientReviews: []
    },
    {
      id: '4',
      name: 'Dr. Emma Johnson',
      specialization: 'Pediatrics',
      subSpecialty: 'Neonatology',
      qualifications: ['MD, Pediatrics', 'FAAP'],
      experience: 8,
      rating: 4.7,
      totalRatings: 643,
      consultationFee: 150,
      languages: ['English', 'French'],
      availability: {
        online: true,
        inPerson: true,
        emergency: true
      },
      hospital: {
        name: 'Boston Children\'s Hospital',
        city: 'Boston, MA',
        distance: '3 miles'
      },
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        hours: '9:00 AM - 5:00 PM'
      },
      successRate: 92,
      responseTime: 'Under 1 hour',
      verified: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaJohnson',
      bio: 'Pediatric specialist with focus on neonatal care. Compassionate approach to child healthcare.',
      patientReviews: []
    },
    {
      id: '5',
      name: 'Dr. David Kim',
      specialization: 'Dermatology',
      subSpecialty: 'Cosmetic Dermatology',
      qualifications: ['MD, Dermatology', 'FAAD'],
      experience: 14,
      rating: 4.8,
      totalRatings: 1124,
      consultationFee: 220,
      languages: ['English', 'Korean'],
      availability: {
        online: true,
        inPerson: true,
        emergency: false
      },
      hospital: {
        name: 'Massachusetts General Hospital',
        city: 'Boston, MA',
        distance: '15 miles'
      },
      schedule: {
        days: ['Mon', 'Wed', 'Fri', 'Sat'],
        hours: '10:00 AM - 7:00 PM'
      },
      successRate: 95,
      responseTime: 'Under 3 hours',
      verified: true,
      photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim',
      bio: 'Cosmetic dermatology expert with focus on non-invasive treatments and skin health.',
      patientReviews: []
    }
  ];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
      doctor.specialization === selectedSpecialty;
    
    const matchesOnline = !showOnlineOnly || doctor.availability.online;
    const matchesEmergency = !showEmergency || doctor.availability.emergency;
    
    return matchesSearch && matchesSpecialty && matchesOnline && matchesEmergency;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    return a.consultationFee - b.consultationFee;
  });

  const handleBookAppointment = (doctorId: string) => {
    // This would open booking modal
    alert(`Booking appointment with doctor ${doctorId}`);
  };

  return (
    <div className="min-h-screen py-8">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Find Trusted Healthcare Providers
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Connect with verified doctors, specialists, and healthcare professionals. 
            All doctors are thoroughly vetted and rated by patients.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search doctors, specialties, hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty === 'All Specialties' ? 'all' : specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee">Lowest Fee</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <Toggle
              enabled={showOnlineOnly}
              onChange={setShowOnlineOnly}
              label="Online Consultations Only"
            />
            <Toggle
              enabled={showEmergency}
              onChange={setShowEmergency}
              label="Emergency Available"
            />
            <div className="ml-auto flex items-center space-x-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {filteredDoctors.length} doctors found
              </span>
            </div>
          </div>
        </Card>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDoctors.map((doctor) => (
            <MedicalCard
              key={doctor.id}
              className="hover-lift"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Doctor Photo & Basic Info */}
                <div className="lg:w-1/3 p-6 border-r border-neutral-200 dark:border-neutral-700">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900/30 mb-4">
                      <img 
                        src={doctor.photoUrl} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                      {doctor.name}
                    </h3>
                    
                    <div className="mb-3">
                      <Badge variant="outline" className="mb-1">
                        {doctor.specialization}
                      </Badge>
                      {doctor.subSpecialty && (
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {doctor.subSpecialty}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 font-bold">{doctor.rating}</span>
                      <span className="ml-2 text-sm text-neutral-500">
                        ({doctor.totalRatings} reviews)
                      </span>
                    </div>

                    {doctor.verified && (
                      <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Verified Professional</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:w-2/3 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                        Qualifications
                      </h4>
                      <ul className="space-y-1">
                        {doctor.qualifications.map((qual, idx) => (
                          <li key={idx} className="text-sm flex items-center">
                            <Award className="w-3 h-3 text-primary-600 mr-2" />
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                        Experience & Stats
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Experience</span>
                          <span className="font-medium">{doctor.experience} years</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Success Rate</span>
                          <span className="font-medium text-green-600">{doctor.successRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Response Time</span>
                          <span className="font-medium">{doctor.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hospital & Availability */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Hospital & Availability
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-neutral-400 mr-2" />
                        <div>
                          <div className="font-medium">{doctor.hospital.name}</div>
                          <div className="text-sm text-neutral-500">
                            {doctor.hospital.city} • {doctor.hospital.distance} away
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-neutral-400 mr-2" />
                        <span className="text-sm">{doctor.schedule.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Options */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Consultation Options
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.availability.online && (
                        <Badge variant="outline" className="flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          Video Consult
                        </Badge>
                      )}
                      {doctor.availability.inPerson && (
                        <Badge variant="outline" className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          In-Person
                        </Badge>
                      )}
                      {doctor.availability.emergency && (
                        <Badge variant="error" className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          Emergency
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages & Fee */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang) => (
                          <span key={lang} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Consultation Fee
                      </div>
                      <div className="text-2xl font-bold text-primary-600">
                        ${doctor.consultationFee}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleBookAppointment(doctor.id)}
                      className="flex-1"
                      leftIcon={<Calendar className="w-4 h-4" />}
                    >
                      Book Appointment
                    </Button>
                    <Button
                      variant="secondary"
                      leftIcon={<Phone className="w-4 h-4" />}
                    >
                      Call Clinic
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-6">
                <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                  About Dr. {doctor.name.split(' ')[1]}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {doctor.bio}
                </p>
              </div>

              {/* Reviews Preview */}
              {doctor.patientReviews.length > 0 && (
                <div className="border-t border-neutral-200 dark:border-neutral-700 p-6">
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-4">
                    Recent Patient Review
                  </h4>
                  {doctor.patientReviews.slice(0, 1).map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{review.rating}/5</span>
                          {review.verified && (
                            <Shield className="w-4 h-4 text-green-500 ml-2" />
                          )}
                        </div>
                        <span className="text-sm text-neutral-500">{review.date}</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 italic">
                        "{review.comment}"
                      </p>
                      <div className="mt-2 text-sm text-neutral-500">
                        - {review.patientName}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </MedicalCard>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Verified Doctors
            </div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Patient Satisfaction
            </div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Emergency Support
            </div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Specialties Covered
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};