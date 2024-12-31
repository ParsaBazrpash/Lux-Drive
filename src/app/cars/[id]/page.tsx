"use client"

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft } from 'lucide-react';

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CarDetail = ({ params }: CarDetailPageProps) => {
  const { id } = use(params);

  const carsData = {
    '1': {
      id: 1,
      name: "Tesla Model 3",
      price: "73,490",
      image: "/images/tesla s.png",
      type: "Electric",
      year: "2024",
      description: "Experience the future of driving with the Tesla Model 3. This all-electric sedan combines luxury with cutting-edge technology and exceptional performance.",
      specs: {
        range: "405 miles",
        acceleration: "0-60 mph in 3.1s",
        topSpeed: "149 mph",
        powertrain: "Dual Motor All-Wheel Drive"
      },
      features: [
        "Enhanced Autopilot",
        "17-inch Cinematic Display",
        "Premium Audio System",
        "Wireless Gaming Computer",
        "HEPA Air Filtration",
        "Custom Driver Profiles"
      ],
      gallery: [
        "/images/tesla s.png",
        "/images/teslainside.jpg",
        "/images/teslainside2.jpg",
      ]
    },
    '2': {
      id: 2,
      name: "BMW M4",
      price: "52,800",
      image: "/images/bmwi4.png",
      type: "Luxury",
      year: "2024",
      description: "The BMW M4 delivers exceptional performance and luxury in one stunning package. With its powerful engine and precise handling, it offers an unmatched driving experience.",
      specs: {
        engine: "3.0L Twin-Turbo inline-6",
        horsepower: "473 hp",
        acceleration: "0-60 mph in 3.8s",
        transmission: "8-speed automatic"
      },
      features: [
        "M Sport Differential",
        "Carbon Fiber Roof",
        "Adaptive M Suspension",
        "BMW Live Cockpit Professional",
        "Harman Kardon Surround Sound",
        "Head-Up Display"
      ],
      gallery: [
        "/images/bmwi4.png",
        "/images/bmwback.jpg",
        "/images/bmwinside2.jpg"
      ]
    },
    '3': {
      id: 3,
      name: "Mercedes C-Class",
      price: "42,000",
      image: "/images/benz c.png",
      type: "Luxury",
      year: "2024",
      description: "The Mercedes-Benz C-Class exemplifies luxury and sophistication. This elegant sedan combines refined comfort with cutting-edge technology and impressive performance capabilities.",
      specs: {
        engine: "2.0L Turbocharged 4-cylinder",
        horsepower: "255 hp",
        acceleration: "0-60 mph in 5.9s",
        transmission: "9G-TRONIC 9-speed"
      },
      features: [
        "MBUX Infotainment System",
        "11.9-inch Central Display",
        "Burmester® 3D Surround Sound",
        "LED Digital Light System",
        "Active Distance Assist DISTRONIC®",
        "Wireless Device Charging"
      ],
      gallery: [
        "/images/benz c.png",
        "/images/benzinside.png",
        "/images/benzinside2.jpg"
      ]
    },
    '4': {
      id: 4,
      name: "Porsche 911",
      price: "116,950",
      image: "/images/porsche911.png",
      type: "Sports",
      year: "2024",
      description: "The iconic Porsche 911 continues to set the standard for sports cars. With its legendary performance, precise handling, and timeless design, it delivers an unparalleled driving experience.",
      specs: {
        engine: "3.0L Twin-Turbo Flat-Six",
        horsepower: "379 hp",
        acceleration: "0-60 mph in 3.4s",
        transmission: "8-speed PDK"
      },
      features: [
        "Sport Chrono Package",
        "Porsche Active Suspension Management",
        "Launch Control",
        "Porsche Communication Management",
        "Bose® Surround Sound System",
        "Sport Seats Plus"
      ],
      gallery: [
        "/images/porsche911.png",
        "/images/porscheinside.jpg",
        "/images/porscheback.jpg"
      ]
    },
    '5': {
      id: 5,
      name: "Audi e-tron GT",
      price: "106,500",
      image: "/images/etron.png",
      type: "Electric",
      year: "2024",
      description: "The Audi e-tron GT represents the perfect fusion of luxury and electric performance. This all-electric grand tourer combines stunning design with cutting-edge technology.",
      specs: {
        range: "238 miles",
        horsepower: "522 hp",
        acceleration: "0-60 mph in 3.9s",
        charging: "5-80% in 23 minutes"
      },
      features: [
        "Matrix LED headlights",
        "Audi Virtual Cockpit",
        "Bang & Olufsen 3D Sound",
        "Adaptive Air Suspension",
        "e-quattro all-wheel drive",
        "Massage Front Seats"
      ],
      gallery: [
        "/images/etron.png",
        "/images/etroninside.jpg",
        "/images/etronback.jpg"
      ]
    },
    '6': {
      id: 6,
      name: "Lexus LS",
      price: "77,535",
      image: "/images/lexusls.png",
      type: "Luxury",
      year: "2024",
      description: "The Lexus LS is the epitome of luxury and refinement. This flagship sedan offers exceptional comfort, advanced technology, and meticulous craftsmanship.",
      specs: {
        engine: "3.5L Twin-Turbo V6",
        horsepower: "416 hp",
        acceleration: "0-60 mph in 4.6s",
        transmission: "10-speed Direct-Shift"
      },
      features: [
        "Mark Levinson® Audio",
        "28-way Power Front Seats",
        "Lexus Safety System+ 2.5",
        "Digital Rearview Mirror",
        "Kiriko Glass Interior Trim",
        "Executive Package with Massage"
      ],
      gallery: [
        "/images/lexusls.png",
        "/images/lexusinside.jpg",
        "/images/lexusback.jpg"
      ]
    }
  };

  const car = carsData[id as keyof typeof carsData];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Car not found</h1>
          <Link href="/cars" className="text-red-600 hover:text-red-700 mt-4 inline-block">
            ← Back to All Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/cars" 
          className="inline-flex items-center text-red-600 hover:text-red-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={car.gallery[selectedImage]}
                alt={car.name}
                width={800}
                height={600}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {car.gallery.map((img, index) => (
                <div 
                  key={index} 
                  className={`bg-slate-100 rounded-lg overflow-hidden transition ${
                    selectedImage === index ? 'ring-2 ring-red-600' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img}
                    alt={`${car.name} view ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-24 object-cover cursor-pointer hover:opacity-75 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">{car.name}</h1>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded">
                    {car.type}
                  </span>
                  <span className="inline-block bg-slate-100 text-slate-800 text-sm px-3 py-1 rounded">
                    {car.year}
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">${car.price}</p>
            </div>

            <p className="text-slate-600 mb-8">{car.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 capitalize">{key}</p>
                    <p className="text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h2>
              <div className="grid grid-cols-2 gap-y-2">
                {car.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    <span className="text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link 
                href={`/schedule?carId=${id}&carName=${car.name}`}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Test Drive
              </Link>
              <button className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-lg hover:bg-slate-200 transition">
                Contact Dealer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;