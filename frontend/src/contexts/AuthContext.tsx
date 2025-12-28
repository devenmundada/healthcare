import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  age: number;
  healthConditions: string[];
  lastLogin: string;
}

interface Appointment {
  id: string;
  type: 'Video Consultation' | 'In-person' | 'Follow-up';
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  duration: string;
}

interface HealthNotification {
  id: string;
  type: 'Appointment' | 'Assessment' | 'Voice Analysis' | 'Health Tip';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  appointments: Appointment[];
  notifications: HealthNotification[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleAuth: () => void;
  markNotificationAsRead: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  location: 'San Francisco, CA',
  age: 34,
  healthConditions: ['Asthma', 'Seasonal Allergies'],
  lastLogin: new Date().toISOString(),
};

// Mock appointments
const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    type: 'Video Consultation',
    doctor: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'Scheduled',
    duration: '30 min',
  },
  {
    id: 'apt-002',
    type: 'In-person',
    doctor: 'Dr. Michael Rodriguez',
    specialization: 'Respiratory',
    date: 'Jan 25, 2024',
    time: '2:30 PM',
    status: 'Scheduled',
    duration: '45 min',
  },
  {
    id: 'apt-003',
    type: 'Follow-up',
    doctor: 'Dr. Lisa Wang',
    specialization: 'Mental Health',
    date: 'Feb 1, 2024',
    time: '11:15 AM',
    status: 'Scheduled',
    duration: '20 min',
  },
];

// Mock notifications
const mockNotifications: HealthNotification[] = [
  {
    id: 'notif-001',
    type: 'Appointment',
    title: 'Appointment Confirmed',
    message: 'Your video consultation with Dr. Sarah Chen is scheduled for tomorrow at 10:00 AM',
    timestamp: '2 hours ago',
    read: false,
    priority: 'High',
  },
  {
    id: 'notif-002',
    type: 'Assessment',
    title: 'Health Assessment Completed',
    message: 'Your monthly health assessment shows improvement in respiratory metrics',
    timestamp: '1 day ago',
    read: false,
    priority: 'Medium',
  },
  {
    id: 'notif-003',
    type: 'Voice Analysis',
    title: 'Voice Analysis Results Ready',
    message: 'Recent voice analysis detected normal patterns. No concerns identified.',
    timestamp: '3 days ago',
    read: true,
    priority: 'Low',
  },
  {
    id: 'notif-004',
    type: 'Health Tip',
    title: 'Daily Health Tip',
    message: 'Remember to take your prescribed medication and stay hydrated today',
    timestamp: '1 week ago',
    read: true,
    priority: 'Low',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For demo purposes, start with authenticated = true
  // Change to false to see logged-out state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('auth_demo_isAuthenticated');
    return saved ? JSON.parse(saved) : true; // Default to true for demo
  });

  const [user, setUser] = useState<User | null>(() => {
    if (!isAuthenticated) return null;
    const saved = localStorage.getItem('auth_demo_user');
    return saved ? JSON.parse(saved) : mockUser;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('auth_demo_appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  const [notifications, setNotifications] = useState<HealthNotification[]>(() => {
    const saved = localStorage.getItem('auth_demo_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('auth_demo_isAuthenticated', JSON.stringify(isAuthenticated));
    if (user) {
      localStorage.setItem('auth_demo_user', JSON.stringify(user));
    }
    localStorage.setItem('auth_demo_appointments', JSON.stringify(appointments));
    localStorage.setItem('auth_demo_notifications', JSON.stringify(notifications));
  }, [isAuthenticated, user, appointments, notifications]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple mock validation
    if (email && password) {
      setIsAuthenticated(true);
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setIsAuthenticated(true);
      setUser(mockUser);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'Scheduled',
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    appointments,
    notifications,
    login,
    logout,
    toggleAuth,
    markNotificationAsRead,
    addAppointment,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};