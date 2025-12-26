import { SeverityLevel } from './ui.types';

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    experience: number;
    rating: number;
    consultations: number;
    avatarUrl?: string;
    isOnline: boolean;
}

export interface Pathology {
    id: string;
    name: string;
    confidence: number;
    severity: SeverityLevel;
    description: string;
    prevalence: string;
}

export interface AnalysisResult {
    id: string;
    imageUrl: string;
    patientId: string;
    patientAge: number;
    patientGender: 'male' | 'female' | 'other';
    timestamp: Date;
    findings: Pathology[];
    recommendations: string[];
    urgency: SeverityLevel;
    note: string;
}

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'assistant' | 'system';
    timestamp: Date;
    type?: 'text' | 'image' | 'file';
    isEmergency?: boolean;
}

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isComingSoon?: boolean;
}

export interface StatCard {
    title: string;
    value: string | number;
    change?: number;
    description: string;
    icon: React.ReactNode;
}