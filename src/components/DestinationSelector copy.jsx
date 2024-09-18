import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const popularDestinations = [
  { name: 'Varadero', country: 'Caribbean', image: '/placeholder.svg' },
  { name: 'Bavaro', country: 'Caribbean', image: '/placeholder.svg' },
  { name: 'Belek', country: 'Türkiye', image: '/placeholder.svg' },
  { name: 'Istanbul', country: 'Türkiye', image: '/placeholder.svg' },
  { name: 'Miami Beach', country: 'United States', image: '/placeholder.svg' },
  { name: 'Costa Adeje', country: 'Spain', image: '/placeholder.svg' },
];

const DestinationSelector = ({ selectedDestination, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div class="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Where do you want to go?</h2>
      <p className="text-gray-600 mb-4">Search or get inspired by popular destinations.</p>
      <Input
        type="text"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {popularDestinations.map((destination) => (
          <Card
            key={destination.name}
            className={`p-4 cursor-pointer ${
              selectedDestination === destination.name ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => onSelect(destination.name)}
          >
            <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="font-semibold">{destination.name}</h3>
            <p className="text-sm text-gray-600">{destination.country}</p>
          </Card>
        ))}
      </div> */}
    </div>
  );
};

export default DestinationSelector;