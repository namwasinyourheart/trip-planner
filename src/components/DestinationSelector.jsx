import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const popularDestinations = [
    { name: 'Paris', country: 'France', image: '/images/paris.svg' },
    { name: 'New York', country: 'United States', image: '/images/new-york.svg' },
    { name: 'Tokyo', country: 'Japan', image: '/images/tokyo.svg' },
    { name: 'London', country: 'United Kingdom', image: '/images/london.svg' },
    { name: 'Rome', country: 'Italy', image: '/images/rome.svg' },
    { name: 'Barcelona', country: 'Spain', image: '/images/barcelona.svg' },
    { name: 'Hanoi', country: 'Vietnam', image: '/images/hanoi.svg' },
    { name: 'Ho Chi Minh City', country: 'Vietnam', image: '/images/ho-chi-minh-city.svg' },
    { name: 'Da Nang', country: 'Vietnam', image: '/images/da-nang.svg' },
    { name: 'Hue', country: 'Vietnam', image: '/images/hue.svg' },
    { name: 'Nha Trang', country: 'Vietnam', image: '/images/nha-trang.svg' },
    { name: 'Hoi An', country: 'Vietnam', image: '/images/hoi-an.svg' },
    { name: 'Sapa', country: 'Vietnam', image: '/images/sapa.svg' },
    { name: 'Mekong Delta', country: 'Vietnam', image: '/images/mekong-delta.svg' },
    { name: 'Phu Quoc', country: 'Vietnam', image: '/images/phu-quoc.svg' },
    { name: 'Halong Bay', country: 'Vietnam', image: '/images/halong-bay.svg' },
    { name: 'Can Tho', country: 'Vietnam', image: '/images/can-tho.svg' },
    { name: 'Da Lat', country: 'Vietnam', image: '/images/da-lat.svg' },
    { name: 'Mui Ne', country: 'Vietnam', image: '/images/mui-ne.svg' },
    { name: 'Vung Tau', country: 'Vietnam', image: '/images/vung-tau.svg' },
    { name: 'Quang Binh', country: 'Vietnam', image: '/images/quang-binh.svg' }
  ];
  
const DestinationSelector = ({ selectedDestination, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  // Filter destinations based on the search query
  const filteredDestinations = popularDestinations.filter(destination =>
    destination.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownVisible(true); // Show dropdown when user types
  };

  const handleSelect = (destination) => {
    onSelect(destination);
    setInputValue(destination);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.destination-dropdown')) {
      setIsDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold mb-4">Where do you want to go?</h2>
      <p className="text-gray-600 mb-4">Search for your destination from the list below.</p>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search destinations..."
          value={inputValue}
          onChange={handleChange}
          className="mb-6"
        />
        {isDropdownVisible && filteredDestinations.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10 destination-dropdown">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.name}
                className="p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(destination.name)}
              >
                <div className="flex items-center">
                  <img src={destination.image} alt={destination.name} className="w-12 h-12 object-cover rounded mr-3" />
                  <div>
                    <h3 className="font-semibold">{destination.name}</h3>
                    <p className="text-sm text-gray-600">{destination.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {popularDestinations.slice(0, 6).map((destination) => (
            <Card
              key={destination.name}
              className={`p-4 cursor-pointer ${
                selectedDestination === destination.name ? 'bg-primary text-primary-foreground' : ''
              }`}
              onClick={() => handleSelect(destination.name)}
            >
              <img src={destination.image} alt={destination.name} className="w-full h-32 object-cover mb-2 rounded" />
              <h3 className="font-semibold">{destination.name}</h3>
              <p className="text-sm text-gray-600">{destination.country}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationSelector;
