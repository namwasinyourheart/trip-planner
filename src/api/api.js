const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your FastAPI backend URL

export async function fetchSuggestedPlaces(formData) {
  const response = await fetch(`${API_BASE_URL}/suggested-places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch suggested places');
  }

  return response.json();
}

export async function createItinerary(formData, selectedPlaces) {
  console.log("api: createItinerary/formData:", formData)
  console.log("api: createItinerary/selectedPlaces:", selectedPlaces)

//   formData = {
//     "destination": "Paris",
//     "dateRange": {
//         "from_date": "2024-09-16",
//         "to_date": "2024-09-19"
//     },
//     "tripType": "family",
//     "interests": [
//         "History"
//     ]
// } 

//   selectedPlaces = [
//     "Notre-Dame Cathedral",
//     "Louvre Museum",
//     "Eiffel Tower",
// ]
  
  const response = await fetch(`${API_BASE_URL}/create-itinerary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData, selectedPlaces }),
  });

  // console.log("response:", response.json())

  if (!response.ok) {
    throw new Error('Failed to create itinerary');
  }

  return response.json();
}