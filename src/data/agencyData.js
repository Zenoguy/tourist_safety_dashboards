// Mock data for Agency Worker Dashboard
export const mockAgencyData = {
  tasks: [
    {
      id: "task-1",
      taskNumber: "T001",
      name: "Heritage Tour - Victoria Memorial",
      time: "09:00 AM",
      location: "Victoria Memorial",
      priority: "high",
      customerIds: ["cust-1", "cust-2"],
      checkpoints: [
        {
          id: "cp-1",
          name: "Victoria Memorial Entrance",
          description: "Meet customers at main entrance",
          location: "Victoria Memorial Gate",
          estimatedTime: "15 mins",
          completed: true
        },
        {
          id: "cp-2", 
          name: "Museum Tour",
          description: "Guided tour of the museum",
          location: "Victoria Memorial Museum",
          estimatedTime: "45 mins",
          completed: false
        },
        {
          id: "cp-3",
          name: "Garden Walk",
          description: "Walk through memorial gardens",
          location: "Memorial Gardens",
          estimatedTime: "30 mins",
          completed: false
        }
      ]
    },
    {
      id: "task-2",
      taskNumber: "T002", 
      name: "Howrah Bridge Photography Tour",
      time: "02:00 PM",
      location: "Howrah Bridge",
      priority: "medium",
      customerIds: ["cust-3"],
      checkpoints: [
        {
          id: "cp-4",
          name: "Bridge Viewpoint",
          description: "Best photography spots",
          location: "Howrah Bridge Viewpoint",
          estimatedTime: "20 mins",
          completed: false
        },
        {
          id: "cp-5",
          name: "River Cruise",
          description: "Short boat ride under bridge",
          location: "Hooghly River",
          estimatedTime: "40 mins", 
          completed: false
        }
      ]
    },
    {
      id: "task-3",
      taskNumber: "T003",
      name: "Dakshineswar Temple Visit",
      time: "04:30 PM", 
      location: "Dakshineswar Temple",
      priority: "low",
      customerIds: ["cust-4", "cust-5"],
      checkpoints: [
        {
          id: "cp-6",
          name: "Temple Entry",
          description: "Guide through temple protocols",
          location: "Dakshineswar Temple",
          estimatedTime: "10 mins",
          completed: false
        },
        {
          id: "cp-7",
          name: "Prayer Session",
          description: "Participate in evening prayers",
          location: "Main Temple Hall",
          estimatedTime: "25 mins",
          completed: false
        }
      ]
    },
    {
      id: "task-4",
      taskNumber: "T004",
      name: "Park Street Food Walk",
      time: "07:00 PM",
      location: "Park Street",
      priority: "medium",
      customerIds: ["cust-6"],
      checkpoints: [
        {
          id: "cp-8",
          name: "Flurys Cafe",
          description: "Famous bakery and cafe",
          location: "Park Street",
          estimatedTime: "20 mins",
          completed: false
        },
        {
          id: "cp-9",
          name: "Street Food Stalls",
          description: "Local street food experience",
          location: "Park Street Market",
          estimatedTime: "30 mins",
          completed: false
        }
      ]
    }
  ],
  
  customers: [
    {
      id: "cust-1",
      name: "Amit Sharma",
      phone: "+91-9876543210",
      email: "amit@email.com",
      pickupTime: "08:45 AM",
      pickupLocation: "Hotel Grand, Park Street",
      verified: false,
      verifiedAt: null
    },
    {
      id: "cust-2", 
      name: "Priya Patel",
      phone: "+91-9876543211",
      email: "priya@email.com", 
      pickupTime: "08:50 AM",
      pickupLocation: "Oberoi Grand Hotel",
      verified: true,
      verifiedAt: "2024-01-15T08:50:00Z"
    },
    {
      id: "cust-3",
      name: "Rajesh Kumar",
      phone: "+91-9876543212",
      email: "rajesh@email.com",
      pickupTime: "01:45 PM", 
      pickupLocation: "Howrah Station",
      verified: false,
      verifiedAt: null
    },
    {
      id: "cust-4",
      name: "Meera Singh",
      phone: "+91-9876543213",
      email: "meera@email.com",
      pickupTime: "04:15 PM",
      pickupLocation: "Sealdah Station",
      verified: false,
      verifiedAt: null
    },
    {
      id: "cust-5",
      name: "Arjun Gupta", 
      phone: "+91-9876543214",
      email: "arjun@email.com",
      pickupTime: "04:20 PM",
      pickupLocation: "Esplanade Metro",
      verified: false,
      verifiedAt: null
    },
    {
      id: "cust-6",
      name: "Sneha Roy",
      phone: "+91-9876543215", 
      email: "sneha@email.com",
      pickupTime: "06:45 PM",
      pickupLocation: "New Market",
      verified: false,
      verifiedAt: null
    }
  ]
};