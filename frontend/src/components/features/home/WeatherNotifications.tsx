import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { 
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  AlertTriangle,
  Bell,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  aqi: number;
  condition: string;
  location: string;
  alerts: string[];
}

interface Appointment {
  id: string;
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  meetingLink?: string;
}

export const WeatherNotifications: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Chen',
      specialization: 'Cardiology',
      date: 'Today',
      time: '2:30 PM',
      type: 'online',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Rodriguez',
      specialization: 'General Checkup',
      date: 'Tomorrow',
      time: '11:00 AM',
      type: 'in-person'
    }
  ]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Mock weather data - in production, connect to OpenWeatherMap API
    const mockWeather: WeatherData = {
      temperature: 72,
      humidity: 65,
      aqi: 45, // Good
      condition: 'Partly Cloudy',
      location: 'New York, NY',
      alerts: [
        'Moderate pollen levels today',
        'UV index: High (6) - Use sunscreen',
        'Air quality: Good'
      ]
    };

    setWeather(mockWeather);

    // Generate health notifications based on weather
    const newNotifications: string[] = [];
    
    if (mockWeather.aqi > 100) {
      newNotifications.push('⚠️ Poor air quality detected. Limit outdoor activities.');
    }
    
    if (mockWeather.temperature > 90) {
      newNotifications.push('🌡️ Extreme heat warning. Stay hydrated and avoid sun exposure.');
    }
    
    if (mockWeather.humidity > 80) {
      newNotifications.push('💧 High humidity may affect respiratory conditions.');
    }

    // Add appointment reminders
    appointments.forEach(appt => {
      if (appt.date === 'Today') {
        newNotifications.push(`📅 Upcoming appointment with ${appt.doctor} at ${appt.time}`);
      }
    });

    setNotifications(newNotifications);
  }, []);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { text: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (aqi <= 100) return { text: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Sun')) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (condition.includes('Rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (condition.includes('Cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
    return <Wind className="w-8 h-8 text-blue-400" />;
  };

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_blank');
  };

  const handleAddToCalendar = (appointment: Appointment) => {
    // In production, integrate with Google Calendar API
    alert(`Adding ${appointment.doctor}'s appointment to your calendar`);
  };

  if (!weather) return null;

  const aqiStatus = getAQIStatus(weather.aqi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Weather Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-neutral-400 mr-2" />
            <h3 className="font-bold text-neutral-900 dark:text-white">
              {weather.location}
            </h3>
          </div>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {getWeatherIcon(weather.condition)}
            <div className="ml-4">
              <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                {weather.temperature}°F
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {weather.condition}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center mb-1">
              <Thermometer className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Humidity</span>
            </div>
            <div className="text-lg font-bold">{weather.humidity}%</div>
          </div>
          
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center mb-1">
              <Wind className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Air Quality</span>
            </div>
            <div className={`text-lg font-bold ${aqiStatus.color}`}>
              {aqiStatus.text}
            </div>
            <div className="text-xs text-neutral-500">AQI: {weather.aqi}</div>
          </div>
        </div>

        <div className="space-y-2">
          {weather.alerts.map((alert, index) => (
            <div key={index} className="flex items-start p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{alert}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Appointment Notifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-primary-600 mr-2" />
            <h3 className="font-bold text-neutral-900 dark:text-white">
              Upcoming Appointments
            </h3>
          </div>
          <Badge variant="outline">{appointments.length}</Badge>
        </div>

        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900 dark:text-white">
                  {appt.doctor}
                </h4>
                <Badge variant={appt.type === 'online' ? 'outline' : 'default'}>
                  {appt.type === 'online' ? 'Virtual' : 'In-person'}
                </Badge>
              </div>
              
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {appt.specialization}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">{appt.date}</div>
                  <div className="text-sm text-neutral-500">{appt.time}</div>
                </div>
              </div>

              <div className="flex space-x-2">
                {appt.type === 'online' && appt.meetingLink && (
                  <Button
                    size="sm"
                    onClick={() => handleJoinMeeting(appt.meetingLink!)}
                    className="flex-1"
                  >
                    Join Meeting
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddToCalendar(appt)}
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4">
          View All Appointments
        </Button>
      </Card>

      {/* Health Notifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="font-bold text-neutral-900 dark:text-white">
              Health Notifications
            </h3>
          </div>
          <Badge variant="warning">{notifications.length}</Badge>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div 
                key={index} 
                className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
              >
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{notification}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No notifications at the moment</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-sm font-bold text-blue-600">ℹ️</span>
            </div>
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white mb-1">
                Smart Health Alerts
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Notifications are personalized based on weather, location, and your health profile
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};