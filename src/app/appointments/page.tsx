"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Car } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: number;
  carName: string;
  carId: string;
  name: string;
  email: string;
  date: string;
  time: string;
  scheduledAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

const AppointmentsPage = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Load appointments from localStorage
    const loadAppointments = () => {
      try {
        const savedAppointments = localStorage.getItem('testDriveAppointments');
        if (savedAppointments) {
          const parsed = JSON.parse(savedAppointments) as Partial<Appointment>[];
          // Add status field if not present and ensure all required fields exist
          const withStatus = parsed.map(app => ({
            ...app,
            status: app.status || 'Confirmed'
          })) as Appointment[];
          setAppointments(withStatus);
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
        setAppointments([]);
      }
    };

    loadAppointments();
  }, []);

  // Sort appointments into upcoming and past
  const currentDate = new Date();
  const upcomingAppointments = appointments.filter(app => {
    const appointmentDate = new Date(`${app.date}T${app.time}`);
    return appointmentDate > currentDate && app.status !== 'Cancelled';
  });

  const pastAppointments = appointments.filter(app => {
    const appointmentDate = new Date(`${app.date}T${app.time}`);
    return appointmentDate <= currentDate || app.status === 'Cancelled';
  });

  const handleCancel = (id: number) => {
    try {
      const updatedAppointments = appointments.map(app => 
        app.id === id ? { ...app, status: 'Cancelled' as const } : app
      );
      localStorage.setItem('testDriveAppointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleReschedule = (appointment: Appointment) => {
    router.push(`/schedule?carId=${appointment.carId}&carName=${appointment.carName}&rescheduleId=${appointment.id}`);
  };

  // Format date to be more readable
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {  // Removed unused error parameter
      return dateStr;
    }
  };

  // Format time to be more readable
  const formatTime = (timeStr: string) => {
    try {
      return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    } catch {  // Removed unused error parameter
      return timeStr;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Appointments</h1>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Upcoming Test Drives</h2>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-slate-600">No upcoming test drives scheduled.</p>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow p-6 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Car className="h-8 w-8 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.carName}</h3>
                        <p className="text-slate-600 text-sm mb-1">Scheduled by: {appointment.name}</p>
                        <div className="flex items-center space-x-4 text-slate-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(appointment.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(appointment.time)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span 
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button 
                      onClick={() => handleReschedule(appointment)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleCancel(appointment.id)}
                      className="text-slate-600 hover:text-slate-700 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Past Test Drives</h2>
          <div className="space-y-4">
            {pastAppointments.length === 0 ? (
              <p className="text-slate-600">No past test drives.</p>
            ) : (
              pastAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-slate-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Car className="h-8 w-8 text-slate-400" />
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.carName}</h3>
                        <p className="text-slate-600 text-sm mb-1">Scheduled by: {appointment.name}</p>
                        <div className="flex items-center space-x-4 text-slate-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(appointment.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(appointment.time)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span 
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;