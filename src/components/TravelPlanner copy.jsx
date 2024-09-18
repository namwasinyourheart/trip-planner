'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import DestinationSelector from './DestinationSelector';
import DateRangePicker from './DateRangePicker';
import TripTypeSelector from './TripTypeSelector';
import InterestSelector from './InterestSelector';
import SuggestedPlaces from './SuggestedPlaces';
import DetailedItinerary from './DetailedItinerary';
import { fetchSuggestedPlaces, createItinerary } from '../api/api';

const TravelPlanner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    dateRange: { from: null, to: null },
    tripType: '',
    interests: []
  });
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const updateFormData = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    console.log("Formdata:", formData);
  
    // Convert dates to 'YYYY-MM-DD' format
    const formattedFormData = {
      ...formData,
      dateRange: {
        from_date: formData.dateRange.from.toISOString().split('T')[0],
        to_date: formData.dateRange.to.toISOString().split('T')[0],
      },
    };

    console.log("formattedFormData:", formattedFormData);
  
    try {
      const places = await fetchSuggestedPlaces(formattedFormData);
      setSuggestedPlaces(places);
      setStep(5);
    } catch (err) {
      setError('Failed to fetch suggested places. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handlePlaceSelection = (selectedIds) => {
    setSelectedPlaces(selectedIds);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const formattedFormData = {
        ...formData,
        dateRange: {
          from_date: formData.dateRange.from.toISOString().split('T')[0],
          to_date: formData.dateRange.to.toISOString().split('T')[0],
        },
      };
      
      const itinerary = await createItinerary(formattedFormData, selectedPlaces);
      console.log("itinerary:", itinerary)
      // console.log("FormData:", formData)
      // console.log("selectedPlaces:", selectedPlaces)

      setItineraryData(itinerary);
      // console.log("Itinerary:", itinerary)
      setShowItinerary(true);
    } catch (err) {
      setError('Failed to create itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleNewPlan = () => {
    setStep(1);
    setFormData({
      destination: '',
      dateRange: { from: null, to: null },
      tripType: '',
      interests: []
    });
    setSuggestedPlaces([]);
    setSelectedPlaces([]);
    setShowItinerary(false);
  };


  const handleEditItinerary = () => {
    setShowItinerary(false);
    setStep(5); // Go back to the SuggestedPlaces step
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DestinationSelector 
          selectedDestination={formData.destination} 
          onSelect={(destination) => updateFormData('destination', destination)} 
        />;
      case 2:
        return <DateRangePicker 
          selectedRange={formData.dateRange} 
          onSelect={(range) => updateFormData('dateRange', range)} 
        />;
      case 3:
        return <TripTypeSelector 
          selectedType={formData.tripType} 
          onSelect={(type) => updateFormData('tripType', type)} 
        />;
      case 4:
        return <InterestSelector 
          selectedInterests={formData.interests} 
          onSelect={(interests) => updateFormData('interests', interests)} 
        />;
      case 5:
        return <SuggestedPlaces 
          places={suggestedPlaces}
          selectedPlaces={selectedPlaces}
          onSelect={handlePlaceSelection}
          destination={formData.destination}
        />;
      default:
        // console.log(formData)
        return null;
    }
  };

  if (showItinerary) {
    return <DetailedItinerary 
      selectedPlaces={selectedPlaces}
      formData={formData}
      onNewPlan={handleNewPlan}
      onEditItinerary={handleEditItinerary}
    />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {renderStep()}
      <div className="flex justify-between mt-6">
        {step > 1 && step <= 5 && (
          <Button onClick={handleBack} variant="outline" disabled={isLoading}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext} className="ml-auto" disabled={isLoading}>
            Next
          </Button>
        ) : step === 4 ? (
          <Button onClick={handleSubmit} className="ml-auto" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        ) : (
          <Button onClick={handleFinalSubmit} className="ml-auto" disabled={isLoading}>
            {isLoading ? 'Creating Itinerary...' : 'Create Itinerary'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TravelPlanner;