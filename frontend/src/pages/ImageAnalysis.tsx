import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { MedicalContainer } from '../components/layout/MedicalContainer';
import { GlassCard } from '../components/layout/GlassCard';
import { MedicalCard, DiagnosticCard } from '../components/ui/MedicalCard';
import { Button, ClinicalButton, EmergencyButton } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Input } from '../components/ui/Input';
import { Toggle } from '../components/ui/Toggle';
import { MedicalDisclaimer } from '../components/shared/MedicalDisclaimer';
import ClinicalDisclaimer from '../components/shared/ClinicalDisclaimer';
import { AuditTrail } from '../components/features/audit/AuditTrail';
import { Steps, Step } from '../components/features/image-analysis/Steps';
import { PatientInfoForm } from '../components/features/image-analysis/PatientInfoForm';
import { PathologyHeatmap } from '../components/features/image-analysis/PathologyHeatmap';
import { ClinicalNotes } from '../components/features/image-analysis/ClinicalNotes';
import {
    Upload,
    Scan,
    AlertTriangle,
    CheckCircle,
    Eye,
    EyeOff,
    Download,
    Share2,
    Filter,
    BarChart3,
    Thermometer,
    User,
    Calendar,
    Shield,
    Lock,
    FileText,
    MessageSquare,
    ChevronRight,
    X,
    Info
} from 'lucide-react';
import { mockAnalysisResults, mockPathologies } from '../mocks/analysisResults';

// Mock audit events for HIPAA compliance
const mockAuditEvents = [
    {
        id: '1',
        timestamp: new Date(),
        user: 'Dr. Sarah Chen',
        role: 'Radiologist',
        action: 'view' as const,
        resource: 'Chest X-ray Analysis',
        details: 'Viewed patient PT-001 imaging results',
        ipAddress: '192.168.1.100',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 300000),
        user: 'Dr. Sarah Chen',
        role: 'Radiologist',
        action: 'edit' as const,
        resource: 'Clinical Notes',
        details: 'Added differential diagnosis notes',
        ipAddress: '192.168.1.100',
    },
];

export const ImageAnalysis: React.FC = () => {
    // Clinical workflow state
    const [currentStep, setCurrentStep] = useState<'patient' | 'upload' | 'processing' | 'results'>('patient');
    const [patientInfo, setPatientInfo] = useState<any>(null);
    const [consentAccepted, setConsentAccepted] = useState(false);

    // Image upload state
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Analysis state
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [selectedPathology, setSelectedPathology] = useState<string | null>(null);
    const [analysisResults, setAnalysisResults] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [clinicalNotes, setClinicalNotes] = useState('');

    // UI state
    const [showAuditTrail, setShowAuditTrail] = useState(false);
    const [viewMode, setViewMode] = useState<'clinical' | 'patient'>('clinical');

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simulate patient info submission
    const handlePatientInfoSubmit = (data: any) => {
        setPatientInfo(data);
        setCurrentStep('upload');
        // Log audit event
        console.log('Patient info submitted:', data);
    };

    // Simulate image upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['.dcm', '.dicom', '.jpg', '.jpeg', '.png'];
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

        if (!validTypes.includes(fileExtension)) {
            alert('Please upload a valid medical image (DICOM, JPEG, PNG)');
            return;
        }

        // Validate file size (50MB max for medical images)
        if (file.size > 50 * 1024 * 1024) {
            alert('File size exceeds 50MB limit for medical images');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        // Simulate processing delay
        setTimeout(() => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setIsUploading(false);
                setUploadProgress(100);
                clearInterval(progressInterval);

                // Auto-proceed to analysis
                setTimeout(() => {
                    setCurrentStep('processing');
                    startAnalysis();
                }, 500);
            };
            reader.readAsDataURL(file);
        }, 1500);
    };

    // Simulate AI analysis
    const startAnalysis = () => {
        setIsAnalyzing(true);

        // Simulate AI processing with progress
        setTimeout(() => {
            setAnalysisResults({
                ...mockAnalysisResults[0],
                confidence: 96.5,
                processingTime: '2.4 seconds',
                modelVersion: 'TorchXRayVision v1.4.2',
            });
            setIsAnalyzing(false);
            setCurrentStep('results');
        }, 3000);
    };

    // Get severity color
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'low': return 'bg-clinical-low text-clinical-low';
            case 'medium': return 'bg-clinical-moderate text-clinical-moderate';
            case 'high': return 'bg-clinical-high text-clinical-high';
            case 'critical': return 'bg-clinical-critical text-clinical-critical';
            default: return 'bg-neutral-100 text-neutral-800';
        }
    };

    // Get confidence color
    const getConfidenceColor = (confidence: number) => {
        if (confidence > 0.9) return 'bg-clinical-normal';
        if (confidence > 0.7) return 'bg-clinical-moderate';
        if (confidence > 0.5) return 'bg-clinical-high';
        return 'bg-clinical-critical';
    };

    // Clinical workflow steps
    const renderStepContent = () => {
        switch (currentStep) {
            case 'patient':
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <User className="w-10 h-10 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                                Patient Information
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Provide clinical context for accurate AI analysis
                            </p>
                        </div>

                        <ClinicalDisclaimer
                            onAccept={() => setConsentAccepted(true)}
                            required={true}
                            className="mb-6"
                        />

                        {consentAccepted && (
                            <PatientInfoForm
                                onSubmit={handlePatientInfoSubmit}
                                className="mb-6"
                            />
                        )}
                    </div>
                );

            case 'upload':
                return (
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                <Scan className="w-10 h-10 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                                Upload Medical Image
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                DICOM format preferred for clinical accuracy
                            </p>
                        </div>

                        {!uploadedImage ? (
                            <GlassCard className="p-8">
                                <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-12 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".dcm,.dicom,.jpg,.jpeg,.png"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                    />
                                    <div
                                        onClick={() => !isUploading && fileInputRef.current?.click()}
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        {isUploading ? (
                                            <>
                                                <LoadingSpinner size="lg" className="mb-4" />
                                                <div className="w-full max-w-xs mx-auto">
                                                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-2">
                                                        <div
                                                            className="h-full bg-primary-600 transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                        Uploading... {uploadProgress}%
                                                    </p>
                                                </div>
                                                <p className="mt-4 text-lg font-medium">Processing medical image...</p>
                                                <p className="text-sm text-neutral-500 mt-2">
                                                    Validating DICOM metadata
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-6">
                                                    <Upload className="w-12 h-12 text-primary-600" />
                                                </div>
                                                <p className="text-lg font-medium">
                                                    Drag & drop or click to upload
                                                </p>
                                                <p className="text-sm text-neutral-500 mt-2 mb-6">
                                                    Chest X-rays, CT scans, MRI images • DICOM, JPEG, PNG
                                                </p>
                                                <div className="space-y-3">
                                                    <Button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        leftIcon={<Upload className="w-4 h-4" />}
                                                    >
                                                        Select Medical Image
                                                    </Button>
                                                    <div className="text-xs text-neutral-500">
                                                        Maximum file size: 50MB • HIPAA compliant upload
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                        <div className="text-2xl font-bold text-primary-600 mb-1">DICOM</div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Preferred Format
                                        </div>
                                    </div>
                                    <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                        <div className="text-2xl font-bold text-primary-600 mb-1">18+</div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Pathologies Detected
                                        </div>
                                    </div>
                                    <div className="text-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                        <div className="text-2xl font-bold text-primary-600 mb-1">96.2%</div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Clinical Accuracy
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ) : (
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded medical image"
                                        className="max-w-full h-auto rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700"
                                    />
                                    {showHeatmap && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-red-500/40 rounded-xl" />
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Toggle
                                        enabled={showHeatmap}
                                        onChange={setShowHeatmap}
                                        label="Show Heatmap"
                                        description="Grad-CAM visualization"
                                    />
                                    <Button
                                        variant="secondary"
                                        leftIcon={<Download className="w-4 h-4" />}
                                    >
                                        Download DICOM
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        leftIcon={<Share2 className="w-4 h-4" />}
                                    >
                                        Share with Team
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'processing':
                return (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-32 h-32 mx-auto mb-8 relative">
                            <LoadingSpinner size="lg" className="absolute inset-0" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Scan className="w-16 h-16 text-primary-600" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                            AI Analysis in Progress
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                            Processing with TorchXRayVision models trained on 2M+ chest X-rays
                        </p>

                        <div className="space-y-4 max-w-md mx-auto">
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Image preprocessing</span>
                                <Badge variant="success">Complete</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Feature extraction</span>
                                <Badge variant="success">Complete</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Pathology detection</span>
                                {isAnalyzing ? (
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2" />
                                        <span className="text-sm text-amber-600">Processing...</span>
                                    </div>
                                ) : (
                                    <Badge variant="warning">In Progress</Badge>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-600 dark:text-neutral-400">Report generation</span>
                                <Badge variant="outline">Pending</Badge>
                            </div>
                        </div>

                        <div className="mt-12">
                            <MedicalDisclaimer variant="critical" />
                        </div>
                    </div>
                );

            case 'results':
                return (
                    <div className="space-y-8">
                        {/* Results Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                                    Analysis Results
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <Badge variant="success">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Analysis Complete
                                    </Badge>
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Patient: {patientInfo?.patientId || 'PT-001'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    leftIcon={<Eye className="w-4 h-4" />}
                                    onClick={() => setViewMode(viewMode === 'clinical' ? 'patient' : 'clinical')}
                                >
                                    {viewMode === 'clinical' ? 'Patient View' : 'Clinical View'}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    leftIcon={<FileText className="w-4 h-4" />}
                                >
                                    Generate Report
                                </Button>
                                <EmergencyButton
                                    size="sm"
                                    leftIcon={<AlertTriangle className="w-4 h-4" />}
                                    onClick={() => alert('Emergency consultation initiated')}
                                >
                                    Emergency Consult
                                </EmergencyButton>
                            </div>
                        </div>

                        {/* Main Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Image & Heatmap */}
                            <div className="lg:col-span-2 space-y-6">
                                <DiagnosticCard
                                    title="Medical Imaging"
                                    subtitle="Original with AI overlay"
                                    severity="high"
                                >
                                    <div className="relative">
                                        <img
                                            src={uploadedImage || 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800'}
                                            alt="Analyzed medical image"
                                            className="w-full h-auto rounded-lg"
                                        />
                                        <PathologyHeatmap
                                            pathologies={mockPathologies}
                                            showHeatmap={showHeatmap}
                                            onPathologySelect={setSelectedPathology}
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Toggle
                                                enabled={showHeatmap}
                                                onChange={setShowHeatmap}
                                                label="Heatmap Overlay"
                                                size="sm"
                                            />
                                            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                                <Shield className="w-4 h-4 mr-1" />
                                                HIPAA Compliant
                                            </div>
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            Model: TorchXRayVision v1.4.2
                                        </div>
                                    </div>
                                </DiagnosticCard>

                                {/* Pathology Findings */}
                                <MedicalCard
                                    title="Pathology Findings"
                                    subtitle="AI-detected abnormalities with confidence scores"
                                    severity="critical"
                                >
                                    <div className="space-y-4">
                                        {mockPathologies.slice(0, 5).map((pathology) => (
                                            <div
                                                key={pathology.id}
                                                className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedPathology === pathology.id
                                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                                                    }`}
                                                onClick={() => setSelectedPathology(pathology.id)}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        <AlertTriangle className="w-5 h-5 text-neutral-400 mr-3" />
                                                        <div>
                                                            <h4 className="font-semibold text-neutral-900 dark:text-white">
                                                                {pathology.name}
                                                            </h4>
                                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                                {pathology.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <Badge className={`${getSeverityColor(pathology.severity)} bg-opacity-10`}>
                                                            {pathology.severity.toUpperCase()}
                                                        </Badge>
                                                        <div className="text-right">
                                                            <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${getConfidenceColor(pathology.confidence)}`}
                                                                    style={{ width: `${pathology.confidence * 100}%` }}
                                                                />
                                                            </div>
                                                            <div className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                                                                {(pathology.confidence * 100).toFixed(1)}%
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </MedicalCard>

                                {/* Clinical Notes */}
                                <ClinicalNotes
                                    value={clinicalNotes}
                                    onChange={setClinicalNotes}
                                    patientInfo={patientInfo}
                                    className="mb-6"
                                />
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6">
                                {/* Patient Summary */}
                                <MedicalCard title="Patient Summary">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 text-neutral-400 mr-3" />
                                            <div>
                                                <div className="font-medium">{patientInfo?.name || 'John Smith'}</div>
                                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {patientInfo?.age || '65'}y • {patientInfo?.gender || 'Male'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-neutral-400 mr-3" />
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                Exam: {new Date().toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                                            <div className="text-xs text-neutral-500 mb-1">Patient ID</div>
                                            <div className="font-mono text-sm">{patientInfo?.patientId || 'PT-001'}</div>
                                        </div>
                                    </div>
                                </MedicalCard>

                                {/* Clinical Recommendations */}
                                <MedicalCard
                                    title="Clinical Recommendations"
                                    severity="high"
                                >
                                    <ul className="space-y-2">
                                        {mockAnalysisResults[0]?.recommendations?.map((rec: string, idx: number) => (
                                            <li key={idx} className="flex items-start">
                                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0" />
                                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                    {rec}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                        <ClinicalButton fullWidth leftIcon={<MessageSquare className="w-4 h-4" />}>
                                            Consult Specialist
                                        </ClinicalButton>
                                    </div>
                                </MedicalCard>

                                {/* Model Information */}
                                <MedicalCard title="AI Model Information">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Model</span>
                                            <span className="font-medium">TorchXRayVision</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Version</span>
                                            <span className="font-medium">v1.4.2</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Training Data</span>
                                            <span className="font-medium">2M+ images</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Processing Time</span>
                                            <span className="font-medium">2.4 seconds</span>
                                        </div>
                                        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                                            <div className="flex items-center">
                                                <Lock className="w-4 h-4 text-green-500 mr-2" />
                                                <span className="text-sm text-green-600 dark:text-green-400">
                                                    Model validated for clinical use
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </MedicalCard>

                                {/* Audit Trail Toggle */}
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    leftIcon={<Shield className="w-4 h-4" />}
                                    onClick={() => setShowAuditTrail(!showAuditTrail)}
                                    rightIcon={<ChevronRight className={`w-4 h-4 transition-transform ${showAuditTrail ? 'rotate-90' : ''}`} />}
                                >
                                    View Audit Trail
                                </Button>
                            </div>
                        </div>

                        {/* Audit Trail Panel */}
                        {showAuditTrail && (
                            <div className="mt-8 animate-fade-in">
                                <AuditTrail events={mockAuditEvents} />
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <MedicalContainer type="clinical" padding="standard">
            {/* Clinical Workflow Steps */}
            <div className="mb-8">
                <Steps currentStep={currentStep}>
                    <Step
                        number={1}
                        title="Patient Info"
                        description="Clinical context"
                        status={currentStep === 'patient' ? 'active' : currentStep > 'patient' ? 'completed' : 'pending'}
                    />
                    <Step
                        number={2}
                        title="Image Upload"
                        description="DICOM validation"
                        status={currentStep === 'upload' ? 'active' : currentStep > 'upload' ? 'completed' : 'pending'}
                    />
                    <Step
                        number={3}
                        title="AI Analysis"
                        description="Processing"
                        status={currentStep === 'processing' ? 'active' : currentStep > 'processing' ? 'completed' : 'pending'}
                    />
                    <Step
                        number={4}
                        title="Clinical Results"
                        description="Review findings"
                        status={currentStep === 'results' ? 'active' : 'pending'}
                    />
                </Steps>
            </div>

            {/* Current Step Content */}
            {renderStepContent()}

            {/* Navigation Controls */}
            {currentStep !== 'results' && (
                <div className="mt-12 flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            if (currentStep === 'upload') setCurrentStep('patient');
                            if (currentStep === 'processing') setCurrentStep('upload');
                            if (currentStep === 'results') setCurrentStep('processing');
                        }}
                        disabled={currentStep === 'patient'}
                    >
                        Back
                    </Button>

                    {currentStep === 'patient' && (
                        <Button
                            onClick={() => consentAccepted && setCurrentStep('upload')}
                            disabled={!consentAccepted}
                            rightIcon={<ChevronRight className="w-4 h-4" />}
                        >
                            Continue to Upload
                        </Button>
                    )}
                </div>
            )}

            {/* Global Medical Disclaimer */}
            <div className="mt-12">
                <MedicalDisclaimer variant="critical" />
            </div>
        </MedicalContainer>
    );
};