from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import date

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Mock data for demonstration purposes
MOCK_SUGGESTED_PLACES = {
    "Paris": ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    "New York": ["Statue of Liberty", "Central Park", "Metropolitan Museum of Art"],
    "Tokyo": ["Tokyo Tower", "Senso-ji Temple", "Shibuya Crossing"],
    "London": ["Big Ben", "London Eye", "Buckingham Palace"],
    "Rome": ["Colosseum", "Vatican Museums", "Trevi Fountain"],
    "Barcelona": ["Sagrada Familia", "Park Güell", "La Rambla"],
    "Hanoi": ["Hoan Kiem Lake", "Temple of Literature", "Old Quarter"],
    "Ho Chi Minh City": ["War Remnants Museum", "Cu Chi Tunnels", "Ben Thanh Market"],
    "Da Nang": ["My Khe Beach", "Marble Mountains", "Dragon Bridge"],
    "Hue": ["Imperial City", "Thien Mu Pagoda", "Hue Citadel"],
    "Nha Trang": ["Nha Trang Beach", "Vinpearl Land", "Long Son Pagoda"],
    "Hoi An": ["Ancient Town", "Japanese Covered Bridge", "An Bang Beach"],
    "Sapa": ["Fansipan Mountain", "Sapa Market", "Terraced Rice Fields"],
    "Mekong Delta": ["Cai Rang Floating Market", "Ben Tre", "My Tho"],
    "Phu Quoc": ["Sao Beach", "Vinpearl Safari", "Dinh Cau Night Market"],
    "Halong Bay": ["Cruise Tour", "Sung Sot Cave", "Ti Top Island"],
    "Can Tho": ["Can Tho Floating Market", "Ninh Kieu Wharf", "Binh Thuy Ancient House"],
    "Da Lat": ["Datanla Falls", "Xuan Huong Lake", "Crazy House"],
    "Mui Ne": ["Sand Dunes", "Mui Ne Beach", "Fairy Stream"],
    "Vung Tau": ["Christ of Vung Tau", "Back Beach", "Front Beach"],
    "Quang Binh": ["Phong Nha Cave", "Paradise Cave", "Dark Cave"]
}

MOCK_ITINERARY = {
    "Paris": {
        "Day 1": {
            "Eiffel Tower": ("09:00", "12:00"),
            "Louvre Museum": ("14:00", "17:00")
        },
        "Day 2": {
            "Notre-Dame Cathedral": ("10:00", "12:00"),
            "Montmartre": ("14:00", "16:00")
        }
    },
    "New York": {
        "Day 1": {
            "Statue of Liberty": ("09:00", "12:00"),
            "Battery Park": ("13:00", "15:00")
        },
        "Day 2": {
            "Central Park": ("10:00", "13:00"),
            "Metropolitan Museum of Art": ("15:00", "17:00")
        }
    },
    "Hanoi": {
        "Day 1": {
            "Hoan Kiem Lake": ("09:00", "11:00"),
            "Temple of Literature": ("13:00", "15:00")
        },
        "Day 2": {
            "Old Quarter": ("10:00", "13:00"),
            "One Pillar Pagoda": ("15:00", "17:00")
        }
    },
    "Ho Chi Minh City": {
        "Day 1": {
            "War Remnants Museum": ("09:00", "11:00"),
            "Cu Chi Tunnels": ("13:00", "16:00")
        },
        "Day 2": {
            "Ben Thanh Market": ("10:00", "12:00"),
            "Notre-Dame Cathedral Basilica of Saigon": ("14:00", "16:00")
        }
    },
    "Da Nang": {
        "Day 1": {
            "My Khe Beach": ("09:00", "11:00"),
            "Marble Mountains": ("13:00", "15:00")
        },
        "Day 2": {
            "Dragon Bridge": ("10:00", "12:00"),
            "My Son Sanctuary": ("14:00", "17:00")
        }
    },
    "Hue": {
        "Day 1": {
            "Imperial City": ("09:00", "12:00"),
            "Thien Mu Pagoda": ("13:00", "15:00")
        },
        "Day 2": {
            "Hue Citadel": ("10:00", "13:00"),
            "Tu Duc Tomb": ("14:00", "17:00")
        }
    },
    "Nha Trang": {
        "Day 1": {
            "Nha Trang Beach": ("09:00", "11:00"),
            "Vinpearl Land": ("13:00", "17:00")
        },
        "Day 2": {
            "Long Son Pagoda": ("10:00", "12:00"),
            "Po Nagar Cham Towers": ("14:00", "16:00")
        }
    },
    "Hoi An": {
        "Day 1": {
            "Ancient Town": ("09:00", "12:00"),
            "Japanese Covered Bridge": ("13:00", "15:00")
        },
        "Day 2": {
            "An Bang Beach": ("10:00", "13:00"),
            "Hoi An Market": ("14:00", "17:00")
        }
    },
    "Sapa": {
        "Day 1": {
            "Fansipan Mountain": ("09:00", "12:00"),
            "Sapa Market": ("13:00", "15:00")
        },
        "Day 2": {
            "Terraced Rice Fields": ("10:00", "13:00"),
            "Cat Cat Village": ("14:00", "17:00")
        }
    },
    "Mekong Delta": {
        "Day 1": {
            "Cai Rang Floating Market": ("09:00", "12:00"),
            "Ben Tre": ("13:00", "15:00")
        },
        "Day 2": {
            "My Tho": ("10:00", "13:00"),
            "Vinh Long": ("14:00", "17:00")
        }
    },
    "Phu Quoc": {
        "Day 1": {
            "Sao Beach": ("09:00", "12:00"),
            "Vinpearl Safari": ("13:00", "17:00")
        },
        "Day 2": {
            "Dinh Cau Night Market": ("10:00", "13:00"),
            "Vinpearl Land": ("14:00", "17:00")
        }
    },
    "Halong Bay": {
        "Day 1": {
            "Cruise Tour": ("09:00", "12:00"),
            "Sung Sot Cave": ("13:00", "15:00")
        },
        "Day 2": {
            "Ti Top Island": ("10:00", "13:00"),
            "Kayaking": ("14:00", "17:00")
        }
    },
    "Can Tho": {
        "Day 1": {
            "Can Tho Floating Market": ("09:00", "12:00"),
            "Ninh Kieu Wharf": ("13:00", "15:00")
        },
        "Day 2": {
            "Binh Thuy Ancient House": ("10:00", "13:00"),
            "Cai Rang Floating Market": ("14:00", "17:00")
        }
    },
    "Da Lat": {
        "Day 1": {
            "Datanla Falls": ("09:00", "12:00"),
            "Xuan Huong Lake": ("13:00", "15:00")
        },
        "Day 2": {
            "Crazy House": ("10:00", "12:00"),
            "Flower Garden": ("14:00", "17:00")
        }
    },
    "Mui Ne": {
        "Day 1": {
            "Sand Dunes": ("09:00", "12:00"),
            "Mui Ne Beach": ("13:00", "15:00")
        },
        "Day 2": {
            "Fairy Stream": ("10:00", "13:00"),
            "Fishing Village": ("14:00", "17:00")
        }
    },
    "Vung Tau": {
        "Day 1": {
            "Christ of Vung Tau": ("09:00", "11:00"),
            "Back Beach": ("13:00", "15:00")
        },
        "Day 2": {
            "Front Beach": ("10:00", "13:00"),
            "Vung Tau Lighthouse": ("14:00", "17:00")
        }
    },
    "Quang Binh": {
        "Day 1": {
            "Phong Nha Cave": ("09:00", "12:00"),
            "Paradise Cave": ("13:00", "15:00")
        },
        "Day 2": {
            "Dark Cave": ("10:00", "13:00"),
            "Dong Hoi Beach": ("14:00", "17:00")
        }
    }
}



# MOCK_ITINERARY = {
#     "Paris": {
#         "Eiffel Tower": "Day 1: Visit the Eiffel Tower in the morning.",
#         "Louvre Museum": "Day 2: Explore the Louvre Museum.",
#         "Notre-Dame Cathedral": "Day 3: Visit Notre-Dame Cathedral."
#     },
#     "New York": {
#         "Statue of Liberty": "Day 1: Take a ferry to the Statue of Liberty.",
#         "Central Park": "Day 2: Enjoy a relaxing day at Central Park.",
#         "Metropolitan Museum of Art": "Day 3: Discover the Met at your own pace."
#     },
#     "Tokyo": {
#         "Tokyo Tower": "Day 1: Visit Tokyo Tower for panoramic views.",
#         "Senso-ji Temple": "Day 2: Explore Senso-ji Temple and nearby markets.",
#         "Shibuya Crossing": "Day 3: Experience the bustling Shibuya Crossing."
#     },
#     "London": {
#         "Big Ben": "Day 1: See the iconic Big Ben and Houses of Parliament.",
#         "London Eye": "Day 2: Enjoy a ride on the London Eye.",
#         "Buckingham Palace": "Day 3: Visit Buckingham Palace and watch the Changing of the Guard."
#     },
#     "Rome": {
#         "Colosseum": "Day 1: Tour the Colosseum and learn about its history.",
#         "Vatican Museums": "Day 2: Explore the Vatican Museums and Sistine Chapel.",
#         "Trevi Fountain": "Day 3: Visit the Trevi Fountain and make a wish."
#     },
#     "Barcelona": {
#         "Sagrada Familia": "Day 1: Visit the Sagrada Familia and admire its architecture.",
#         "Park Güell": "Day 2: Explore Park Güell and its colorful mosaics.",
#         "La Rambla": "Day 3: Stroll down La Rambla and enjoy local shops and cafes."
#     }
# }

class DateRange(BaseModel):
    from_date: date
    to_date: date

class TravelForm(BaseModel):
    destination: str
    dateRange: DateRange  # Ensure this matches with client-side payload
    tripType: str
    interests: List[str]

    class Config:
        allow_population_by_field_name = True

# class DateRange(BaseModel):
#     from_date: date
#     to_date: date

# class TravelForm(BaseModel):
#     destination: str
#     dateRange: DateRange
#     tripType: str
#     interests: List[str]

class ItineraryRequest(BaseModel):
    formData: TravelForm
    selectedPlaces: List[str]

@app.post("/suggested-places")
async def get_suggested_places(formData: TravelForm):
    destination = formData.destination
    if destination not in MOCK_SUGGESTED_PLACES:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    suggested_places = MOCK_SUGGESTED_PLACES[destination]
    return suggested_places


@app.post("/create-itinerary")
async def create_itinerary(request: ItineraryRequest):
    destination = request.formData.destination
    selected_places = request.selectedPlaces

    print("backend:selected_places:", selected_places)
    
    if destination not in MOCK_ITINERARY:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    # Initialize an empty itinerary
    itinerary = {}
    print("MOCK_ITINERARY[destination].items():", MOCK_ITINERARY[destination].items())
    # Loop through the days and places
    for day, places in MOCK_ITINERARY[destination].items():
        # Filter places based on selected places
        filtered_places = {place: times for place, times in places.items() if place in selected_places}
        print("filtered_places:", filtered_places)
        if filtered_places:
            itinerary[day] = filtered_places

    print("PLAN:", itinerary)
    
    return {
        "destination": destination,
        "selected_places": selected_places,
        "itinerary": itinerary,
        "dateRange": request.formData.dateRange,
        "tripType": request.formData.tripType,
        "interests": request.formData.interests
    }


# @app.post("/create-itinerary")
# async def create_itinerary(request: ItineraryRequest):
#     print("request:", request)
#     destination = request.formData.destination
#     print("destination:", destination)
#     selected_places = request.selectedPlaces
    
#     if destination not in MOCK_ITINERARY:
#         raise HTTPException(status_code=404, detail="Destination not found")
    
#     itinerary = {place: MOCK_ITINERARY[destination].get(place, f"Visit {place}") for place in selected_places}
#     print("itinerary:", itinerary)
    
#     return {
#         "destination": destination,
#         "itinerary": itinerary,
#         "dateRange": request.formData.dateRange,
#         "tripType": request.formData.tripType,
#         "interests": request.formData.interests
#     }
