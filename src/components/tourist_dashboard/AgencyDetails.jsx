import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

const mockTripPlans = {
  "agency-1": [
    {
      id: "trip-1",
      name: "Kolkata Heritage Walk",
      description: "Explore the colonial architecture and historical landmarks of Kolkata",
      duration: "Full Day (8 hours)",
      price: "₹2,500",
      difficulty: "Easy",
      groupSize: "4-12 people",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Victoria Memorial", "Howrah Bridge", "Indian Museum", "St. Paul's Cathedral"],
      includes: ["Professional Guide", "Entry Fees", "Lunch", "Transportation"],
      nextAvailable: "2024-01-20",
      spotsLeft: 6
    },
    {
      id: "trip-2", 
      name: "Cultural Immersion Tour",
      description: "Deep dive into Bengali culture with local artisans and performers",
      duration: "Half Day (4 hours)",
      price: "₹1,800",
      difficulty: "Easy",
      groupSize: "6-15 people",
      startTime: "02:00 PM",
      endTime: "06:00 PM",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Kumartuli Potter's Quarter", "Traditional Dance Show", "Local Market Visit"],
      includes: ["Cultural Guide", "Refreshments", "Souvenir"],
      nextAvailable: "2024-01-18",
      spotsLeft: 3
    },
    {
      id: "trip-3",
      name: "Evening Heritage & Food Tour",
      description: "Combine heritage sites with authentic Bengali cuisine",
      duration: "Evening (5 hours)",
      price: "₹3,200",
      difficulty: "Easy",
      groupSize: "4-10 people", 
      startTime: "04:00 PM",
      endTime: "09:00 PM",
      image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Park Street", "New Market", "Street Food Tasting", "Colonial Buildings"],
      includes: ["Food Guide", "All Meals", "Transportation", "Cultural Stories"],
      nextAvailable: "2024-01-22",
      spotsLeft: 8
    }
  ],
  "agency-2": [
    {
      id: "trip-4",
      name: "Sundarbans Adventure",
      description: "Wildlife safari and mangrove exploration in the Sundarbans",
      duration: "2 Days 1 Night",
      price: "₹8,500",
      difficulty: "Moderate",
      groupSize: "6-20 people",
      startTime: "06:00 AM",
      endTime: "Next Day 06:00 PM",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Tiger Safari", "Boat Cruise", "Bird Watching", "Local Village Visit"],
      includes: ["Accommodation", "All Meals", "Boat Transport", "Forest Guide"],
      nextAvailable: "2024-01-25",
      spotsLeft: 12
    },
    {
      id: "trip-5",
      name: "Darjeeling Hill Trek",
      description: "Scenic trekking experience in the Darjeeling hills",
      duration: "3 Days 2 Nights",
      price: "₹12,000",
      difficulty: "Challenging",
      groupSize: "4-12 people",
      startTime: "05:00 AM",
      endTime: "Day 3 07:00 PM",
      image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Tiger Hill Sunrise", "Tea Garden Visit", "Himalayan Views", "Local Cuisine"],
      includes: ["Mountain Lodge Stay", "All Meals", "Trekking Guide", "Equipment"],
      nextAvailable: "2024-02-01",
      spotsLeft: 4
    }
  ],
  "agency-3": [
    {
      id: "trip-6",
      name: "Spiritual Temple Circuit",
      description: "Visit the most sacred temples and spiritual sites around Kolkata",
      duration: "Full Day (10 hours)",
      price: "₹2,200",
      difficulty: "Easy",
      groupSize: "8-25 people",
      startTime: "05:00 AM",
      endTime: "03:00 PM",
      image: "https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Dakshineswar Temple", "Belur Math", "Kalighat Temple", "Meditation Session"],
      includes: ["Spiritual Guide", "Temple Offerings", "Vegetarian Lunch", "Prayer Books"],
      nextAvailable: "2024-01-19",
      spotsLeft: 15
    }
  ],
  "agency-4": [
    {
      id: "trip-7",
      name: "Bengali Food Trail",
      description: "Authentic culinary journey through Kolkata's best food spots",
      duration: "Half Day (5 hours)",
      price: "₹2,800",
      difficulty: "Easy",
      groupSize: "4-8 people",
      startTime: "11:00 AM", 
      endTime: "04:00 PM",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Street Food Markets", "Traditional Sweets", "Fish Market", "Cooking Demo"],
      includes: ["Food Tastings", "Recipe Cards", "Food Guide", "Digestive Tea"],
      nextAvailable: "2024-01-21",
      spotsLeft: 2
    }
  ],
  "agency-5": [
    {
      id: "trip-8",
      name: "Hooghly River Cruise",
      description: "Scenic boat journey along the historic Hooghly River",
      duration: "Half Day (4 hours)",
      price: "₹1,500",
      difficulty: "Easy",
      groupSize: "10-30 people",
      startTime: "03:00 PM",
      endTime: "07:00 PM",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Howrah Bridge View", "Sunset Cruise", "River History", "Snacks on Board"],
      includes: ["Boat Ride", "Refreshments", "River Guide", "Life Jackets"],
      nextAvailable: "2024-01-17",
      spotsLeft: 20
    }
  ],
  "agency-6": [
    {
      id: "trip-9",
      name: "Modern Kolkata Night Tour",
      description: "Experience the vibrant nightlife and modern culture of Kolkata",
      duration: "Evening (6 hours)",
      price: "₹3,500",
      difficulty: "Easy",
      groupSize: "6-15 people",
      startTime: "06:00 PM",
      endTime: "12:00 AM",
      image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=400",
      highlights: ["Rooftop Bars", "Live Music Venues", "Art Galleries", "Night Markets"],
      includes: ["Club Entry", "Welcome Drinks", "Local Guide", "Transportation"],
      nextAvailable: "2024-01-23",
      spotsLeft: 9
    }
  ]
};

export default function AgencyDetails({ agency, onBack, onBookTrip }) {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const agencyTrips = mockTripPlans[agency.id] || [];

  const handleBookTrip = (trip) => {
    setSelectedTrip(trip);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    onBookTrip(selectedTrip);
    setShowBookingModal(false);
    setSelectedTrip(null);
    alert(`🎉 Successfully booked "${selectedTrip.name}"!\nYou will receive confirmation details shortly.`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-500/20';
      case 'challenging': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4"
        >
          <Icon name="ArrowLeft" size={18} />
          Back to Agencies
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img
            src={agency.image}
            alt={agency.name}
            className="w-full md:w-48 h-48 object-cover rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{agency.name}</h1>
            <p className="text-slate-300 mb-4">{agency.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-400" />
                <span className="font-medium">{agency.rating}</span>
                <span className="text-slate-400">({agency.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={16} className="text-emerald-400" />
                <span>{agency.activeTrips} active trips</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="CheckCircle" size={16} className="text-blue-400" />
                <span>{agency.completedTrips} completed</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {agency.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open(`tel:${agency.contact}`, '_self')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
              >
                <Icon name="Phone" size={18} />
                Call Agency
              </button>
              <button
                onClick={() => window.open(`mailto:${agency.email}`, '_blank')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                <Icon name="Mail" size={18} />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Trip Plans */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Current Trip Plans</h2>
        
        {agencyTrips.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agencyTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden hover:border-slate-500 transition-all duration-200"
              >
                <div className="relative h-48">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg">
                    <span className="text-sm font-medium">{trip.price}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)}`}>
                      {trip.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{trip.name}</h3>
                  <p className="text-sm text-slate-300 mb-3 line-clamp-2">{trip.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-slate-400" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={14} className="text-slate-400" />
                      <span>{trip.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} className="text-slate-400" />
                      <span>Next: {new Date(trip.nextAvailable).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trip.highlights.slice(0, 3).map(highlight => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {trip.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                          +{trip.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className={`font-medium ${trip.spotsLeft <= 5 ? 'text-orange-400' : 'text-emerald-400'}`}>
                        {trip.spotsLeft} spots left
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookTrip(trip)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No current trip plans</p>
            <p className="text-sm">This agency doesn't have any active trips at the moment</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTrip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 p-6 rounded-xl max-w-md w-full border border-slate-600"
          >
            <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold">{selectedTrip.name}</h4>
              <p className="text-sm text-slate-300">{selectedTrip.description}</p>
            </div>

            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span>{selectedTrip.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Price:</span>
                <span className="font-semibold text-emerald-400">{selectedTrip.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Next Available:</span>
                <span>{new Date(selectedTrip.nextAvailable).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Spots Left:</span>
                <span className={selectedTrip.spotsLeft <= 5 ? 'text-orange-400' : 'text-emerald-400'}>
                  {selectedTrip.spotsLeft}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmBooking}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}