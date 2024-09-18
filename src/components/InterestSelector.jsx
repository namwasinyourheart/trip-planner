import React from 'react';
import { Button } from "@/components/ui/button";

const interests = [
  'Must-see Attractions', 'Great Food', 'Hidden Gems', 'Buddhist Shrines',
  'Adventure Sports', 'Natural Wonders', 'Night Markets', 'History', 'Culture',
  'Arts & Theatre', 'Wine & Beer', 'Outdoors'
];

const InterestSelector = ({ selectedInterests, onSelect }) => {
  const toggleInterest = (interest) => {
    const updatedInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    onSelect(updatedInterests);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tell us what you're interested in</h2>
      <p className="text-gray-600 mb-6">Select all that apply.</p>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Button
            key={interest}
            variant={selectedInterests.includes(interest) ? "default" : "outline"}
            onClick={() => toggleInterest(interest)}
            className="mb-2"
          >
            {interest}
          </Button>
        ))}
        <Button variant="outline" className="mb-2">+ Add interest</Button>
      </div>
    </div>
  );
};

export default InterestSelector;