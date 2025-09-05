// Sample data structure - QR codes received from external dashboard
export const initialData = {
  workers: [
    { id: "w-1", name: "Anita Sharma", phone: "+91-9876543210", specialization: "Heritage Sites" },
    { id: "w-2", name: "Ravi Kumar", phone: "+91-9876543211", specialization: "Museums" },
    { id: "w-3", name: "Fatima Ali", phone: "+91-9876543212", specialization: "Nature Tours" },
    { id: "w-4", name: "Amit Singh", phone: "+91-9876543213", specialization: "Adventure" },
  ],
  qrCart: [
    // Pending QR requests from external dashboard
    {
      id: "qr-1",
      touristData: {
        name: "Sourav Banerjee",
        age: 28,
        passport: "Z1234567",
        phone: "+91-9876543214",
        email: "sourav@email.com",
        emergencyContact: "+91-9876543215",
        travelType: "solo",
        specialGroupId: null, // No special ID for solo travelers
      },
      receivedAt: "2025-09-05T10:30:00Z",
      status: "pending" // pending, accepted, rejected
    },
    {
      id: "qr-2",
      touristData: {
        name: "Meera Patel",
        age: 25,
        passport: "X9876543",
        phone: "+91-9876543216",
        email: "meera@email.com",
        emergencyContact: "+91-9876543217",
        travelType: "group",
        specialGroupId: "GRP-FAMILY-001", // Special ID for group travelers
      },
      receivedAt: "2025-09-05T11:00:00Z",
      status: "pending"
    },
    {
      id: "qr-3",
      touristData: {
        name: "Rajesh Patel",
        age: 30,
        passport: "X9876544",
        phone: "+91-9876543217",
        email: "rajesh@email.com",
        emergencyContact: "+91-9876543218",
        travelType: "group",
        specialGroupId: "GRP-FAMILY-001", // Same special ID - will be grouped together
      },
      receivedAt: "2025-09-05T11:05:00Z",
      status: "pending"
    },
    {
      id: "qr-4",
      touristData: {
        name: "Priya Sharma",
        age: 24,
        passport: "Y1112223",
        phone: "+91-9876543219",
        email: "priya@email.com",
        emergencyContact: "+91-9876543220",
        travelType: "solo",
        specialGroupId: null,
      },
      receivedAt: "2025-09-05T12:00:00Z",
      status: "pending"
    }
  ],
  acceptedTourists: [
    // Tourists who have been accepted from QR cart
  ],
  groups: [
    // Formed groups based on special IDs
  ],
  itineraries: [
    // Created itineraries for accepted tourists/groups
  ]
};
