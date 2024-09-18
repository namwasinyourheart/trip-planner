import React from 'react';
import { Card } from "@/components/ui/card";
import { User, Users, UserPlus, Users2 } from "lucide-react";

const tripTypes = [
  { value: 'solo', label: 'Solo Trip', icon: User },
  { value: 'partner', label: 'Partner trip', icon: Users },
  { value: 'friends', label: 'Friends Trip', icon: UserPlus },
  { value: 'family', label: 'Family trip', icon: Users2 },
];

const TripTypeSelector = ({ selectedType, onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What kind of trip are you planning?</h2>
      <p className="text-gray-600 mb-6">Select one.</p>
      <div className="grid grid-cols-2 gap-4">
        {tripTypes.map((type) => (
          <Card
            key={type.value}
            className={`p-4 cursor-pointer ${
              selectedType === type.value ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelect(type.value)}
          >
            <div className="flex items-center space-x-2">
              <type.icon className="h-6 w-6" />
              <span>{type.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripTypeSelector;