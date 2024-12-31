"use client"

import React, { useState } from 'react';
import { Search, Car, Shield, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // All cars data (you might want to move this to a separate file)
  const allCars = [
    {
      id: 1,
      name: "Tesla Model 3",
      price: "73,490",
      image: "/images/tesla s.png",
      type: "Electric"
    },
    {
      id: 2,
      name: "BMW m4",
      price: "52,800",
      image: "/images/bmwi4.png",
      type: "Luxury"
    },
    {
      id: 3,
      name: "Mercedes C-Class",
      price: "42,000",
      image: "/images/benz c.png",
      type: "Luxury"
    },
    {
      id: 4,
      name: "Porsche 911",
      price: "116,950",
      image: "/images/porsche911.png",
      type: "Sports"
    },
    {
      id: 5,
      name: "Audi e-tron GT",
      price: "106,500",
      image: "/images/etron.png",
      type: "Electric"
    },
    {
      id: 6,
      name: "Lexus LS",
      price: "77,535",
      image: "/images/lexusls.png",
      type: "Luxury"
    }
  ];

  // Featured cars (first 3)
  const featuredCars = allCars.slice(0, 3);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Convert search query to lowercase for case-insensitive search
      const query = searchQuery.toLowerCase();
      
      // Filter cars based on search query
      const matchingCars = allCars.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query)
      );

      if (matchingCars.length > 0) {
        // If there are matching cars, navigate to cars page with search query
        router.push(`/cars?search=${encodeURIComponent(searchQuery)}`);
      } else {
        // If no matches, still navigate but the cars page will handle showing "no results"
        router.push(`/cars?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  // Handle search on enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-900 h-96">
        <div className="absolute inset-0">
          <Image
            src="/herocar.png"
            alt="Hero car"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Drive
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover an extensive collection of premium vehicles. From luxury to economy, 
            find the car that matches your style and needs. Book a test drive today!
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 flex items-center max-w-2xl bg-white rounded-lg p-2">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by make, model, or type..."
              className="flex-1 ml-3 outline-none text-gray-600"
            />
            <button 
              onClick={handleSearch}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
              <Shield className="h-10 w-10 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg">Secure Purchases</h3>
                <p className="text-slate-600">100% secure transaction guarantee</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
              <Car className="h-10 w-10 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg">Quality Vehicles</h3>
                <p className="text-slate-600">Thoroughly inspected cars</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
              <Clock className="h-10 w-10 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg">Fast Scheduling</h3>
                <p className="text-slate-600">Quick and reliable booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Featured Cars</h2>
            <Link 
              href="/cars" 
              className="flex items-center text-red-600 hover:text-red-700"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative h-48">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{car.name}</h3>
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                        {car.type}
                      </span>
                    </div>
                    <p className="text-xl font-bold">${car.price}</p>
                  </div>
                  <Link href={`/cars/${car.id}`}>
                    <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;