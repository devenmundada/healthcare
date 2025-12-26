import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { 
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Heart,
  Activity,
  Navigation,
  Calendar,
  ChevronRight,
  Shield
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  waitTime: string;
  occupancy: number; // 0-100 percentage
  specializations: string[];
  emergencyCapacity: 'high' | 'medium' | 'low';
  predictedRush: {
    start: string;
    end: string;
    intensity: number;
  };
}

export const MapPrediction: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [selectedTime, setSelectedTime] = useState('now');

  const specializations = [
    'All Specializations',
    'Emergency',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Oncology',
    'ICU'
  ];

  const timeOptions = [
    { value: 'now', label: 'Right Now' },
    { value: 'morning', label: 'Morning (8AM-12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM-4PM)' },
    { value: 'evening', label: 'Evening (4PM-8PM)' },
    { value: 'tomorrow', label: 'Tomorrow' }
  ];

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'City General Hospital',
      distance: '2.5 miles',
      waitTime: '15-30 mins',
      occupancy: 35,
      specializations: ['Emergency', 'Cardiology', 'ICU'],
      emergencyCapacity: 'high',
      predictedRush: {
        start: '9:00 AM',
        end: '11:00 AM',
        intensity: 75
      }
    },
    {
      id: '2',
      name: 'Memorial Medical Center',
      distance: '4.2 miles',
      waitTime: '45-60 mins',
      occupancy: 65,
      specializations: ['Neurology', 'Orthopedics'],
      emergencyCapacity: 'medium',
      predictedRush: {
        start: '2:00 PM',
        end: '4:00 PM',
        intensity: 85
      }
    },
    {
      id: '3',
      name: 'Children\'s Hospital',
      distance: '3.8 miles',
      waitTime: '20-40 mins',
      occupancy: 45,
      specializations: ['Pediatrics', 'Emergency'],
      emergencyCapacity: 'high',
      predictedRush: {
        start: '10:00 AM',
        end: '12:00 PM',
        intensity: 90
      }
    },
    {
      id: '4',
      name: 'University Medical Center',
      distance: '5.5 miles',
      waitTime: '60+ mins',
      occupancy: 80,
      specializations: ['Oncology', 'ICU'],
      emergencyCapacity: 'low',
      predictedRush: {
        start: '8:00 AM',
        end: '10:00 AM',
        intensity: 95
      }
    },
    {
      id: '5',
      name: 'Community Health Clinic',
      distance: '1.2 miles',
      waitTime: '5-15 mins',
      occupancy: 25,
      specializations: ['General', 'Emergency'],
      emergencyCapacity: 'medium',
      predictedRush: {
        start: '4:00 PM',
        end: '6:00 PM',
        intensity: 65
      }
    }
  ];

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 40) return 'bg-green-500';
    if (occupancy < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getOccupancyLabel = (occupancy: number) => {
    if (occupancy < 40) return 'Low';
    if (occupancy < 70) return 'Moderate';
    return 'High';
  };

  const getEmergencyBadge = (capacity: 'high' | 'medium' | 'low') => {
    const config = {
      high: { color: 'bg-green-100 text-green-800', icon: <Shield className="w-3 h-3" /> },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="w-3 h-3" /> },
      low: { color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="w-3 h-3" /> }
    };
    
    return (
      <Badge className={`${config[capacity].color} flex items-center`}>
        {config[capacity].icon}
        <span className="ml-1">Emergency {capacity}</span>
      </Badge>
    );
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = searchQuery === '' || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'all' || 
      hospital.specializations.includes(selectedSpecialization);
    
    const matchesEmergency = !showEmergencyOnly || hospital.emergencyCapacity === 'high';
    
    return matchesSearch && matchesSpecialization && matchesEmergency;
  });

  return (
    <div className="min-h-screen py-8">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Hospital Map & Prediction
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Real-time hospital occupancy, wait times, and rush predictions to help you plan your visit
          </p>
        </div>

        {/* Map Visualization (Placeholder) */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Interactive Hospital Map
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Heat map showing hospital occupancy and wait times
                </p>
              </div>
              <Button leftIcon={<Navigation className="w-4 h-4" />}>
                Use My Location
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl relative overflow-hidden">
              {/* Heat Map Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-green-400/20 via-yellow-400/20 to-red-400/20 blur-3xl" />
              </div>
              
              {/* Hospital Markers */}
              {hospitals.slice(0, 3).map((hospital, index) => (
                <div
                  key={hospital.id}
                  className="absolute"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: `${30 + index * 15}%`,
                  }}
                >
                  <div className={`w-8 h-8 rounded-full ${getOccupancyColor(hospital.occupancy)} flex items-center justify-center text-white font-bold shadow-lg`}>
                    {hospital.occupancy < 40 ? 'L' : hospital.occupancy < 70 ? 'M' : 'H'}
                  </div>
                  <div className="mt-2 bg-white dark:bg-neutral-800 rounded-lg p-2 shadow-lg min-w-[200px]">
                    <div className="font-medium">{hospital.name}</div>
                    <div className="text-sm text-neutral-500">{hospital.waitTime} wait</div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-lg">
                <h4 className="font-medium mb-2">Occupancy Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
                    <span className="text-sm">Low (&lt; 40%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />
                    <span className="text-sm">Moderate (40-70%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2" />
                    <span className="text-sm">High (&gt; 70%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button variant="ghost" leftIcon={<MapPin className="w-4 h-4" />}>
                View Full Screen Map
              </Button>
            </div>
          </Card>
        </div>

        {/* Controls & Filters */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search hospitals by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>
              
              <div>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec === 'All Specializations' ? 'all' : spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Toggle
                enabled={showEmergencyOnly}
                onChange={setShowEmergencyOnly}
                label="Show Emergency Hospitals Only"
              />
              <div className="ml-auto flex items-center space-x-2">
                <Filter className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {filteredHospitals.length} hospitals found
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Hospital List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="hover-lift p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hospital.distance} away
                  </div>
                </div>
                {getEmergencyBadge(hospital.emergencyCapacity)}
              </div>

              {/* Occupancy Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Occupancy</span>
                  <span className={`font-bold ${
                    hospital.occupancy < 40 ? 'text-green-600' :
                    hospital.occupancy < 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {getOccupancyLabel(hospital.occupancy)} ({hospital.occupancy}%)
                  </span>
                </div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getOccupancyColor(hospital.occupancy)}`}
                    style={{ width: `${hospital.occupancy}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm">Wait Time</span>
                  </div>
                  <div className="text-lg font-bold">{hospital.waitTime}</div>
                </div>
                
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Users className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm">Specializations</span>
                  </div>
                  <div className="text-lg font-bold">{hospital.specializations.length}</div>
                </div>
              </div>

              {/* Rush Prediction */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-amber-600 mr-2" />
                  <h4 className="font-medium">Predicted Rush Time</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peak Hours</span>
                    <span className="font-medium">{hospital.predictedRush.start} - {hospital.predictedRush.end}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expected Intensity</span>
                    <div className="flex items-center">
                      {hospital.predictedRush.intensity > 80 ? (
                        <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                      )}
                      <span className="font-medium">{hospital.predictedRush.intensity}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Available Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hospital.specializations.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button className="flex-1" leftIcon={<Navigation className="w-4 h-4" />}>
                  Get Directions
                </Button>
                <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
                  Plan Visit
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Prediction Insights */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Best Times to Visit</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Early morning (8-9AM) typically has shortest wait times
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Data updates every 15 minutes for accurate predictions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Emergency Alerts</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Get notified if hospital capacity reaches critical levels
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};