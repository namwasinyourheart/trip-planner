import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

const DetailedItinerary = ({ itineraryData, formData, onNewPlan, onEditItinerary }) => {
  const [activeTab, setActiveTab] = useState("day1");

  const formatDate = (date) => {
    return date ? date.toDateString() : 'Not specified';
  };

  const getDateForDay = (dayIndex) => {
    if (!formData.dateRange.from) return null;
    const date = new Date(formData.dateRange.from);
    date.setDate(date.getDate() + dayIndex);
    return date;
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Itinerary for {formData.destination}</h1>
      <div className="flex space-x-6">
        <div className="w-1/2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Dates:</strong> {formatDate(formData.dateRange.from)} - {formatDate(formData.dateRange.to)}</p>
              <p><strong>Trip Type:</strong> {formData.tripType}</p>
              <p><strong>Interests:</strong> {formData.interests.join(', ')}</p>
            </CardContent>
          </Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {Object.keys(itineraryData).map((day, index) => (
                <TabsTrigger key={day} value={`day${index + 1}`}>
                  {getDateForDay(index)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || `Day ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(itineraryData).map(([day, places], dayIndex) => (
              <TabsContent key={dayIndex} value={`day${dayIndex + 1}`}>
                <h2 className="text-2xl font-semibold mb-4">
                  {getDateForDay(dayIndex)?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) || day}
                </h2>
                {Object.entries(places).map(([place, times], placeIndex) => (
                  <Card key={placeIndex} className="mb-4">
                    <CardContent className="flex p-4">
                      <div>
                        <h3 className="font-semibold">{place}</h3>
                        <p className="text-sm"><Clock className="inline w-4 h-4 mr-1" />{times[0]} - {times[1]}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" />
                Map of {formData.destination}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for map component */}
              <div className="bg-gray-200 h-[600px] flex items-center justify-center">
                Map Component Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={onEditItinerary}>Edit Itinerary</Button>
        <Button onClick={onNewPlan} variant="outline">Create New Travel Plan</Button>
      </div>
    </div>
  );
};

export default DetailedItinerary;
