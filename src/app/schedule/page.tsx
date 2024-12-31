"use client"

import React, { useState, Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  carId: string;
  carName: string;
}

// Loading component with skeleton UI
const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-slate-200 rounded mb-8"></div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
              <div className="h-12 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule form content component
const ScheduleFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const carName = searchParams.get('carName');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    carId: carId || '',
    carName: carName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('testDriveAppointments') || '[]');
    
    // Add new appointment
    const newAppointment = {
      id: Date.now(),
      ...formData,
      scheduledAt: new Date().toISOString(),
    };
    
    // Save updated appointments
    localStorage.setItem(
      'testDriveAppointments', 
      JSON.stringify([...existingAppointments, newAppointment])
    );

    // Show success message
    alert('Test drive scheduled successfully!');
    
    // Redirect back to car detail page
    router.push(`/cars/${carId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get tomorrow's date as minimum date for scheduling
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/cars/${carId}`}
          className="inline-flex items-center text-red-600 hover:text-red-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Car Details
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Schedule Test Drive</h1>
          {carName && (
            <div className="flex flex-col items-center mb-6">
              <p className="text-slate-600 mb-3">
                Car Model: {carName}
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                required
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Time
              </label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Confirm Test Drive
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const SchedulePage = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ScheduleFormContent />
    </Suspense>
  );
};

export default SchedulePage;