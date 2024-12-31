"use client"

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const CarsContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  const allCars = useMemo(() => [
    {
      id: 1,
      name: "Tesla Model 3",
      price: "73,490",
      image: "/images/tesla s.png",
      type: "Electric",
      year: "2024",
      mileage: "New"
    },
    {
      id: 2,
      name: "BMW m4",
      price: "52,800",
      image: "/images/bmwi4.png",
      type: "Luxury",
      year: "2024",
      mileage: "New"
    },
    {
      id: 3,
      name: "Mercedes C-Class",
      price: "42,000",
      image: "/images/benz c.png",
      type: "Luxury",
      year: "2020",
      mileage: "Used"
    },
    {
      id: 4,
      name: "Porsche 911",
      price: "116,950",
      image: "/images/porsche911.png",
      type: "Sports",
      year: "2024",
      mileage: "New"
    },
    {
      id: 5,
      name: "Audi e-tron GT",
      price: "106,500",
      image: "/images/etron.png",
      type: "Electric",
      year: "2024",
      mileage: "New"
    },
    {
      id: 6,
      name: "Lexus LS",
      price: "77,535",
      image: "/images/lexusls.png",
      type: "Luxury",
      year: "2023",
      mileage: "Used"
    }
  ], []); // Empty dependency array since this data is static

  // State for filters
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPrice, setSelectedPrice] = useState("Price Range");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [filteredCars, setFilteredCars] = useState(allCars);

  // Apply search and filters
  const applySearchAndFilters = useCallback(() => {
    let filtered = [...allCars];

    // Apply search query if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (selectedType !== "All Types") {
      filtered = filtered.filter(car => car.type === selectedType);
    }

    // Filter by price range
    if (selectedPrice !== "Price Range") {
      filtered = filtered.filter(car => {
        const price = parseInt(car.price.replace(/,/g, ''));
        switch (selectedPrice) {
          case "$0 - $50,000":
            return price <= 50000;
          case "$50,000 - $100,000":
            return price > 50000 && price <= 100000;
          case "$100,000+":
            return price > 100000;
          default:
            return true;
        }
      });
    }

    // Filter by year
    if (selectedYear !== "Year") {
      filtered = filtered.filter(car => car.year === selectedYear);
    }

    setFilteredCars(filtered);
  }, [searchQuery, selectedType, selectedPrice, selectedYear, allCars]);

  // Effect to apply filters when any filter changes
  useEffect(() => {
    applySearchAndFilters();
  }, [applySearchAndFilters]);

  // Reset filters
  const resetFilters = () => {
    setSelectedType("All Types");
    setSelectedPrice("Price Range");
    setSelectedYear("Year");
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">All Available Cars</h1>
          {searchQuery && (
            <p className="text-slate-600">
              Showing results for: &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
        
        {/* Filter Section */}
        <div className="bg-slate-50 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="rounded-md border-gray-300 shadow-sm p-2"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option>All Types</option>
              <option>Electric</option>
              <option>Luxury</option>
              <option>Sports</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm p-2"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option>Price Range</option>
              <option>$0 - $50,000</option>
              <option>$50,000 - $100,000</option>
              <option>$100,000+</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm p-2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>Year</option>
              <option>2024</option>
              <option>2023</option>
              <option>2020</option>
            </select>
            <button 
              onClick={resetFilters}
              className="bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-slate-600">No cars match your search criteria</p>
            <button 
              onClick={resetFilters}
              className="mt-4 text-red-600 hover:text-red-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
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
                      <div className="flex gap-2 mt-1">
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          {car.type}
                        </span>
                        <span className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">
                          {car.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-xl font-bold">${car.price}</p>
                  </div>
                  <p className="text-slate-600 mt-2">{car.mileage}</p>
                  <Link href={`/cars/${car.id}`}>
                    <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Loading component with skeleton UI
const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-8"></div>
          <div className="bg-slate-50 p-4 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-10 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-slate-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const AllCars = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <CarsContent />
    </Suspense>
  );
};

export default AllCars;