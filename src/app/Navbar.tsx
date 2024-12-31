import React from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="LuxDrive Logo"
                width={40}
                height={40}
                className="object-contain"
              />
             <span className="text-2xl font-bold text-black">LuxDrive</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-black hover:text-red-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/appointments" 
              className="flex items-center text-black hover:text-red-600 transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 mr-1" />
              My Appointments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;