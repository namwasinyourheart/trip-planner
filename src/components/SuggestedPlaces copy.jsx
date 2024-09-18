import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";

const SuggestedPlaces = ({ places, selectedPlaces, onSelect, destination }) => {
  // Convert place names to objects with id, name, and description
  const transformedPlaces = places.map((place, index) => ({
    id: index.toString(), // Using index as a unique id (in real scenarios use a unique identifier)
    name: place,
    description: `Description for ${place}` // Placeholder description
  }));

  const handleSelect = (placeId) => {
    const updatedSelection = selectedPlaces.includes(placeId)
      ? selectedPlaces.filter(id => id !== placeId)
      : [...selectedPlaces, placeId];
    onSelect(updatedSelection);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Suggested Places in {destination}</h2>
        <div className="space-y-4">
          {transformedPlaces.length > 0 ? (
            transformedPlaces.map((place) => (
              <Card key={place.id} className="flex items-center p-4">
                <Checkbox
                  id={`place-${place.id}`}
                  checked={selectedPlaces.includes(place.id)}
                  onCheckedChange={() => handleSelect(place.id)}
                />
                <CardContent className="ml-4">
                  <CardTitle>{place.name}</CardTitle>
                  <p className="text-sm text-gray-600">{place.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-600">No suggested places available.</p>
          )}
        </div>
      </div>
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Map of {destination}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for map component */}
            <div className="bg-gray-200 h-96 flex items-center justify-center">
              Map Component Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuggestedPlaces;
