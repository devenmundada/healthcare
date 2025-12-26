import React, { useState } from 'react';
import { X, Calendar, Clock, Video, User, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });

  const doctors = [
    { id: 1, name: 'Dr. Sarah Chen', specialization: 'Cardiology', available: ['2024-01-20', '2024-01-21'] },
    { id: 2, name: 'Dr. Michael Rodriguez', specialization: 'Neurology', available: ['2024-01-20'] },
    { id: 3, name: 'Dr. Emma Johnson', specialization: 'Pediatrics', available: ['2024-01-22', '2024-01-23'] },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleSubmit = () => {
    // In production, this would call backend API
    alert('Appointment booked successfully! Google Calendar event and Meet link sent.');
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-neutral-800 p-6 border-b border-neutral-200 dark:border-neutral-700 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Book Appointment
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-6">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNum 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                  </div>
                  <div className={`ml-2 text-sm ${step >= stepNum ? 'font-medium' : 'text-neutral-500'}`}>
                    {stepNum === 1 && 'Select Doctor'}
                    {stepNum === 2 && 'Choose Time'}
                    {stepNum === 3 && 'Details'}
                    {stepNum === 4 && 'Confirm'}
                  </div>
                  {stepNum < 4 && (
                    <div className={`ml-2 w-12 h-0.5 ${step > stepNum ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Select Doctor or Specialty
                </h3>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setStep(2);
                      }}
                      className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                            <User className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">
                              {doctor.name}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {doctor.specialization}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Select Date & Time
                </h3>
                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Available Dates
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedDoctor?.available.map((date: string) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-lg border ${
                            selectedDate === date
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-medium">
                              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-2xl font-bold">
                              {new Date(date).getDate()}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border ${
                              selectedTime === time
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                            }`}
                          >
                            <div className="flex items-center justify-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {time}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consultation Type */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 text-center">
                        <Video className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <div className="font-medium">Video Consultation</div>
                        <div className="text-sm text-neutral-500">Google Meet Link</div>
                      </button>
                      <button className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 text-center">
                        <MapPin className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <div className="font-medium">In-Person Visit</div>
                        <div className="text-sm text-neutral-500">Clinic Location</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  Patient Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="John Smith"
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                  />
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      value={patientInfo.reason}
                      onChange={(e) => setPatientInfo({...patientInfo, reason: e.target.value})}
                      placeholder="Briefly describe your symptoms or concerns..."
                      className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                  Confirm Appointment Details
                </h3>
                
                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Doctor</span>
                        <span className="font-medium">{selectedDoctor?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Date & Time</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Patient</span>
                        <span className="font-medium">{patientInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Type</span>
                        <Badge variant="outline">Video Consultation</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">Google Calendar event will be created</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Video className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">Google Meet link will be provided</span>
                    </div>
                    <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <Bell className="w-5 h-5 text-amber-500 mr-3" />
                      <span className="text-sm">Reminders sent 24h and 1h before appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white dark:bg-neutral-800 p-6 border-t border-neutral-200 dark:border-neutral-700 rounded-b-2xl">
            <div className="flex justify-between">
              {step > 1 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              
              <div className="ml-auto flex space-x-3">
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !selectedDoctor) ||
                      (step === 2 && (!selectedDate || !selectedTime)) ||
                      (step === 3 && !patientInfo.name || !patientInfo.email)
                    }
                  >
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Confirm & Book Appointment
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingModal;