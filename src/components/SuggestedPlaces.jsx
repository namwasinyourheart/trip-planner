import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SuggestedPlaces = ({ places, selectedPlaces, onSelect, destination }) => {
  // Convert place names to objects with id, name, description, and coordinates
  const transformedPlaces = places.map((place, index) => ({
    id: index.toString(),
    name: place,
    description: `Description for ${place}`,
    coordinates: [51.505 + index * 0.01, -0.09], // Placeholder coordinates, replace with real data
  }));

  // Set the initial state where all places are selected
  const [selected, setSelected] = useState(transformedPlaces.map(place => place.id));

  // Update the selected places on checkbox change
  const handleSelect = (placeId) => {
    const updatedSelection = selected.includes(placeId)
      ? selected.filter(id => id !== placeId) // Remove from selection if already selected
      : [...selected, placeId]; // Add to selection if not selected
    
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  // Get coordinates of selected places
  const selectedCoordinates = transformedPlaces
    .filter(place => selected.includes(place.id))
    .map(place => place.coordinates);

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
                  checked={selected.includes(place.id)} // Checkbox is checked if the place is selected
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
            <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Render markers for selected places */}
              {transformedPlaces
                .filter(place => selected.includes(place.id)) // Only show markers for selected places
                .map((place) => (
                  <Marker
                    key={place.id}
                    position={place.coordinates}
                    icon={customIcon}
                  >
                    <Popup>
                      <strong>{place.name}</strong>
                      <br />
                      {place.description}
                    </Popup>
                  </Marker>
              ))}
              {/* Draw route between selected places */}
              {selectedCoordinates.length > 1 && (
                <Polyline
                  positions={selectedCoordinates}
                  color="blue" // Route color
                />
              )}
            </MapContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuggestedPlaces;
