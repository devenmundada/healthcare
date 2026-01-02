import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import {
  MapPin,
  Navigation,
  Thermometer,
  Wind,
  Building,
  Phone,
  Navigation as DirectionsIcon,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GlassCard } from '../components/layout/GlassCard';

// Custom hospital icon
const hospitalIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Custom user location icon
const userIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684809.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  location: Location;
  distance: number;
  specialty: string;
  emergency: boolean;
  phone: string;
}

const MapPrediction: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.7749, -122.4194]); // SF default
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Medical Center Dr, San Francisco, CA',
      location: { lat: 37.7759, lng: -122.4184 },
      distance: 0.5,
      specialty: 'Multi-specialty',
      emergency: true,
      phone: '(555) 123-4567'
    },
    {
      id: '2',
      name: 'Westside Medical Center',
      address: '456 Health Ave, San Francisco, CA',
      location: { lat: 37.7739, lng: -122.4214 },
      distance: 1.2,
      specialty: 'Pediatrics',
      emergency: true,
      phone: '(555) 234-5678'
    },
    {
      id: '3',
      name: 'University Hospital',
      address: '789 Campus Rd, San Francisco, CA',
      location: { lat: 37.7769, lng: -122.4164 },
      distance: 2.3,
      specialty: 'Research',
      emergency: true,
      phone: '(555) 345-6789'
    }
  ]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Location access denied. Using default location.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading map and location data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Healthcare Facilities Map
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Find hospitals and medical centers near your location
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - Takes 2/3 of width */}
        <div className="lg:col-span-2">
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Interactive Health Map
                </h2>
                <Badge>
                  {hospitals.length} hospitals
                </Badge>
              </div>
            </div>

            <div className="h-[500px] relative">
              {/* Leaflet Map */}
              <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location circle */}
                {userLocation && (
                  <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius={500}
                    pathOptions={{ fillColor: '#3b82f6', color: '#1d4ed8' }}
                  />
                )}

                {/* User location marker */}
                {userLocation && (
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={userIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">Your Location</h3>
                        <p className="text-sm text-neutral-600">
                          {userLocation.address || 'Current position'}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Hospital markers */}
                {hospitals.map((hospital) => (
                  <Marker
                    key={hospital.id}
                    position={[hospital.location.lat, hospital.location.lng]}
                    icon={hospitalIcon}
                  >
                    <Popup>
                      <div className="p-2 max-w-[250px]">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg">{hospital.name}</h3>
                          {hospital.emergency && (
                            <Badge size="sm" className="bg-red-500 text-white">
                              ER
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">
                          {hospital.address}
                        </p>
                        <p className="text-sm mb-2">
                          <span className="font-medium">Specialty:</span> {hospital.specialty}
                        </p>
                        <p className="text-sm mb-3">
                          <span className="font-medium">Distance:</span> {hospital.distance} miles
                        </p>
                        <div className="flex gap-2">
                          <a
                            href={`tel:${hospital.phone}`}
                            className="flex-1"
                          >
                            <Button size="sm" fullWidth>
                              <Phone className="w-4 h-4 mr-1" />
                              Call
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            variant="secondary"
                            fullWidth
                            onClick={() => {
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${hospital.location.lat},${hospital.location.lng}`,
                                '_blank'
                              );
                            }}
                          >
                            <DirectionsIcon className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map controls overlay */}
              <div className="absolute top-4 right-4 z-[1000] space-y-2">
                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <Button
                  variant="secondary"
                  onClick={() => {
                    if (userLocation) {
                      setMapCenter([userLocation.lat, userLocation.lng]);
                    }
                  }}
                  className="shadow-lg"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Center on me
                </Button>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Your location</span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt="Hospital"
                      className="w-4 h-4 mr-2"
                    />
                    <span>Hospital</span>
                  </div>
                </div>
                <div className="text-neutral-500">
                  Data from OpenStreetMap
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar - Hospitals list */}
        <div>
          <GlassCard className="h-full">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              Nearby Hospitals
            </h2>

            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start mb-3">
                    <Building className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white">
                        {hospital.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {hospital.address}
                      </p>
                    </div>
                    {hospital.emergency && (
                      <Badge size="sm" className="bg-red-500 text-white">
                        ER
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 mr-1 text-neutral-500" />
                      {hospital.distance} miles
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1 text-neutral-500" />
                      {hospital.specialty}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex-1"
                    >
                      <Button size="sm" fullWidth>
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="secondary"
                      fullWidth
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${hospital.location.lat},${hospital.location.lng}`,
                          '_blank'
                        );
                      }}
                    >
                      <DirectionsIcon className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Need immediate help?
                </p>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => window.open('tel:911', '_self')}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Call (911)
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default MapPrediction;
