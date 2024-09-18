import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

const DestinationSelector = ({ selectedDestination, onSelect }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSelect(inputValue);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Where do you want to go?</h2>
      <p className="text-gray-600 mb-4">Enter your desired destination.</p>
      <Input
        type="text"
        placeholder="Enter destination..."
        value={inputValue}
        onChange={handleChange}
        className="mb-6"
      />
      <button 
        onClick={handleSubmit} 
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
      >
        Select Destination
      </button>
    </div>
  );
};

export default DestinationSelector;
