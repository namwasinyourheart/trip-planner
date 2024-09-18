import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateRangePicker = ({ selectedRange, onSelect }) => {
  const handleSelect = (range) => {
    onSelect(range);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-5xl font-bold">When are you going?</h2>
      <p className="text-gray-600">Choose a date range, up to 7 days.</p>
      <Calendar
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        numberOfMonths={2}
        className="rounded-md border"
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onSelect({ from: null, to: null })}
      >
        I don't know my dates yet
      </Button>
    </div>
  );
};

export default DateRangePicker;