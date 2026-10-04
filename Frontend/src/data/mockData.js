export const MOCK_HOTELS = [
  {
    id: "h-101",
    name: "The Oberoi Grand Heritage",
    location: "New Delhi",
    about: "An oasis of tranquility amidst the bustling capital, offering bespoke luxury suites, manicured gardens, Olympic-sized swimming pools, and world-class Indian and international gastronomy.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    price: 14500,
    averageRating: 4.9,
    amenities: ["Free High-Speed WiFi", "Infinity Pool", "Spa & Wellness", "Fine Dining", "Airport Shuttle", "24/7 Room Service"],
    ratings: [
      {
        ratingId: "r-1",
        userId: "u-101",
        hotelId: "h-101",
        rating: 5,
        remarks: "Exceptional hospitality! The architecture and royal service made our anniversary truly unforgettable.",
        user: {
          userID: "u-101",
          name: "Ayush Shukla",
          email: "ayush@gmail.com",
          about: "Tech Lead & Globetrotter"
        },
        createdAt: "2 days ago"
      },
      {
        ratingId: "r-2",
        userId: "u-102",
        hotelId: "h-101",
        rating: 5,
        remarks: "The dining experience was world class. The staff went above and beyond for all our requests.",
        user: {
          userID: "u-102",
          name: "Priya Sharma",
          email: "priya@gmail.com",
          about: "Travel & Food Blogger"
        },
        createdAt: "1 week ago"
      }
    ]
  },
  {
    id: "h-102",
    name: "Taj Exotica Resort & Spa",
    location: "Goa",
    about: "Embrace the languid Mediterranean warmth on the southwest coast of Goa, overlooking the Arabian Sea. Enjoy private villas, sun-drenched private beaches, and rejuvenating Ayurvedic therapies.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    price: 18200,
    averageRating: 4.8,
    amenities: ["Private Beach", "Ayurvedic Spa", "Sea View Balcony", "Beachfront Bar", "Water Sports", "Breakfast Buffet"],
    ratings: [
      {
        ratingId: "r-3",
        userId: "u-103",
        hotelId: "h-102",
        rating: 5,
        remarks: "Direct access to clean Benaulim beach. Sunset views from the balcony were mesmerizing.",
        user: {
          userID: "u-103",
          name: "Rohan Varma",
          email: "rohan@gmail.com",
          about: "Product Designer"
        },
        createdAt: "3 days ago"
      },
      {
        ratingId: "r-4",
        userId: "u-101",
        hotelId: "h-102",
        rating: 4,
        remarks: "Stunning resort grounds. Service at the pool bar was slightly slow but overall a marvelous vacation.",
        user: {
          userID: "u-101",
          name: "Ayush Shukla",
          email: "ayush@gmail.com",
          about: "Tech Lead & Globetrotter"
        },
        createdAt: "2 weeks ago"
      }
    ]
  },
  {
    id: "h-103",
    name: "The St. Regis Mumbai",
    location: "Mumbai",
    about: "Located in the heart of Lower Parel, offering soaring views of the Arabian Sea and city skyline, coupled with the legendary 24-hour St. Regis Butler Service and bespoke luxury lounges.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    price: 16900,
    averageRating: 4.7,
    amenities: ["Butler Service", "Rooftop Lounge", "Helipad Access", "Fitness Center", "High-End Mall Access"],
    ratings: [
      {
        ratingId: "r-5",
        userId: "u-104",
        hotelId: "h-103",
        rating: 5,
        remarks: "The 37th floor penthouse view of Mumbai skyline at night is unmatched. Flawless business stay.",
        user: {
          userID: "u-104",
          name: "Ananya Mehta",
          email: "ananya@gmail.com",
          about: "Venture Capitalist"
        },
        createdAt: "5 days ago"
      }
    ]
  },
  {
    id: "h-104",
    name: "Wildflower Hall, An Oberoi Resort",
    location: "Shimla",
    about: "Set amidst 23 acres of protected cedar forest in the Himalayas at 8,250 feet, featuring open-air heated whirlpools with panoramic snow-capped mountain views and colonial elegance.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    price: 22000,
    averageRating: 4.9,
    amenities: ["Heated Mountain Jacuzzi", "Forest Trekking", "Colonial Library", "Fireplace Suites", "Nature Spa"],
    ratings: [
      {
        ratingId: "r-6",
        userId: "u-102",
        hotelId: "h-104",
        rating: 5,
        remarks: "Sitting in the outdoor heated jacuzzi looking at snow peaks was pure magic. 10/10 recommendation.",
        user: {
          userID: "u-102",
          name: "Priya Sharma",
          email: "priya@gmail.com",
          about: "Travel & Food Blogger"
        },
        createdAt: "1 month ago"
      }
    ]
  },
  {
    id: "h-105",
    name: "Rambagh Palace",
    location: "Jaipur",
    about: "The former residence of the Maharaja of Jaipur, Rambagh Palace offers royal heritage, elaborate marble carving, peacocks roaming lush courtyards, and grand polo suites.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    price: 28500,
    averageRating: 5.0,
    amenities: ["Royal Vintage Car Drive", "Palace Tour", "Peacock Gardens", "Royal Dining Hall", "Heritage Spa"],
    ratings: [
      {
        ratingId: "r-7",
        userId: "u-101",
        hotelId: "h-105",
        rating: 5,
        remarks: "You literally feel like royalty. The welcome ceremony with rose petals and traditional drums was breathtaking.",
        user: {
          userID: "u-101",
          name: "Ayush Shukla",
          email: "ayush@gmail.com",
          about: "Tech Lead & Globetrotter"
        },
        createdAt: "3 weeks ago"
      }
    ]
  },
  {
    id: "h-106",
    name: "Kumarakom Lake Resort",
    location: "Kerala",
    about: "Nestled along the serene shores of Lake Vembanad with 16th-century heritage villas, traditional Meenachil boat cruises, meandering swimming canals, and authentic Ayurvedic rejuvenation.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    price: 13800,
    averageRating: 4.6,
    amenities: ["Backwater Boat Cruise", "Heritage Canal Pool", "Ayurvedic Treatment", "Kerala Seafood Restaurant"],
    ratings: [
      {
        ratingId: "r-8",
        userId: "u-103",
        hotelId: "h-106",
        rating: 4,
        remarks: "Tranquil backwaters and authentic Kerala fish curry. Perfect digital detox weekend.",
        user: {
          userID: "u-103",
          name: "Rohan Varma",
          email: "rohan@gmail.com",
          about: "Product Designer"
        },
        createdAt: "2 weeks ago"
      }
    ]
  }
];

export const MOCK_USERS = [
  {
    userID: "u-101",
    name: "Ayush Shukla",
    email: "ayush@gmail.com",
    about: "Tech Lead & Globetrotter",
    role: "ADMIN"
  },
  {
    userID: "u-102",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    about: "Travel & Food Blogger",
    role: "USER"
  },
  {
    userID: "u-103",
    name: "Rohan Varma",
    email: "rohan@gmail.com",
    about: "Product Designer",
    role: "USER"
  },
  {
    userID: "u-104",
    name: "Ananya Mehta",
    email: "ananya@gmail.com",
    about: "Venture Capitalist",
    role: "USER"
  }
];
