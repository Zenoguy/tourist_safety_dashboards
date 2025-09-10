import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

const mockAgencies = [
  {
    id: "agency-1",
    name: "Heritage Tours Kolkata",
    description: "Explore the rich cultural heritage of Kolkata with expert guides",
    rating: 4.8,
    totalReviews: 245,
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543210",
    email: "info@heritagetours.com",
    specialties: ["Heritage Sites", "Museums", "Cultural Tours"],
    activeTrips: 12,
    completedTrips: 156
  },
  {
    id: "agency-2", 
    name: "Bengal Adventure Co.",
    description: "Adventure tours and outdoor experiences across West Bengal",
    rating: 4.6,
    totalReviews: 189,
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543211",
    email: "adventures@bengaladventure.com",
    specialties: ["Adventure Sports", "Trekking", "Nature Tours"],
    activeTrips: 8,
    completedTrips: 98
  },
  {
    id: "agency-3",
    name: "Spiritual Journeys",
    description: "Discover the spiritual side of Bengal with temple tours and meditation retreats",
    rating: 4.9,
    totalReviews: 312,
    image: "https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543212", 
    email: "peace@spiritualjourneys.com",
    specialties: ["Temple Tours", "Meditation", "Spiritual Retreats"],
    activeTrips: 15,
    completedTrips: 203
  },
  {
    id: "agency-4",
    name: "Food & Culture Walks",
    description: "Taste authentic Bengali cuisine while exploring local culture",
    rating: 4.7,
    totalReviews: 167,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543213",
    email: "taste@foodculture.com", 
    specialties: ["Food Tours", "Street Food", "Cooking Classes"],
    activeTrips: 6,
    completedTrips: 89
  },
  {
    id: "agency-5",
    name: "River & Delta Tours",
    description: "Explore the Sundarbans and river systems of Bengal",
    rating: 4.5,
    totalReviews: 134,
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543214",
    email: "rivers@deltaours.com",
    specialties: ["River Cruises", "Sundarbans", "Wildlife Tours"],
    activeTrips: 4,
    completedTrips: 67
  },
  {
    id: "agency-6",
    name: "Urban Explorer",
    description: "Modern Kolkata tours focusing on contemporary culture and nightlife",
    rating: 4.4,
    totalReviews: 98,
    image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=400",
    contact: "+91-9876543215",
    email: "explore@urbanexplorer.com",
    specialties: ["City Tours", "Nightlife", "Modern Culture"],
    activeTrips: 9,
    completedTrips: 45
  }
];

export default function Agencies({ onSelectAgency }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const allSpecialties = [...new Set(mockAgencies.flatMap(agency => agency.specialties))];

  const filteredAgencies = mockAgencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || 
                            agency.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Travel Agencies</h2>
        <p className="text-slate-300">
          Discover trusted travel agencies and their current trip offerings
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search agencies..."
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Specialties</option>
            {allSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Agency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgencies.map((agency, index) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden hover:border-slate-500 transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectAgency(agency)}
          >
            {/* Agency Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={agency.image}
                alt={agency.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg flex items-center gap-1">
                <Icon name="Star" size={14} className="text-yellow-400" />
                <span className="text-sm font-medium">{agency.rating}</span>
              </div>
            </div>

            {/* Agency Info */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-emerald-400 transition-colors">
                  {agency.name}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2">
                  {agency.description}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-400" />
                  <span>{agency.rating}</span>
                  <span className="text-slate-400">({agency.totalReviews} reviews)</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {agency.specialties.slice(0, 2).map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                  {agency.specialties.length > 2 && (
                    <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded text-xs">
                      +{agency.specialties.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mb-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-emerald-400">{agency.activeTrips}</div>
                  <div className="text-slate-400">Active Trips</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-400">{agency.completedTrips}</div>
                  <div className="text-slate-400">Completed</div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(agency.contact);
                  }}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Icon name="Phone" size={14} />
                  Call
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmail(agency.email);
                  }}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Icon name="Mail" size={14} />
                  Email
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAgencies.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No agencies found</p>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4">Platform Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{mockAgencies.length}</div>
            <div className="text-sm text-slate-400">Total Agencies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {mockAgencies.reduce((sum, agency) => sum + agency.activeTrips, 0)}
            </div>
            <div className="text-sm text-slate-400">Active Trips</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {mockAgencies.reduce((sum, agency) => sum + agency.completedTrips, 0)}
            </div>
            <div className="text-sm text-slate-400">Completed Trips</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {(mockAgencies.reduce((sum, agency) => sum + agency.rating, 0) / mockAgencies.length).toFixed(1)}
            </div>
            <div className="text-sm text-slate-400">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}