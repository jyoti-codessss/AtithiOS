import React, { createContext, useContext, useState } from 'react';
import { initialListings, demoImpactMetrics } from '../data/mockData';

const AtithiContext = createContext();

export function AtithiProvider({ children }) {
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'host' | 'planner' | 'impact' | 'my-bookings'
  const [listings, setListings] = useState(initialListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingListing, setBookingListing] = useState(null);
  const [completedBooking, setCompletedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState(demoImpactMetrics);

  const addListing = (newListing) => {
    const formattedListing = {
      id: String(listings.length + 1),
      name: newListing.name || "Serene Himalayan Homestay",
      location: newListing.location || "Naggar, Himachal Pradesh",
      region: newListing.region || "North",
      type: newListing.type || "homestay",
      price: Number(newListing.price) || 2000,
      otaPrice: Math.round(Number(newListing.price || 2000) * 1.35),
      verified: true,
      ecoScore: Math.floor(Math.random() * 15) + 85,
      rating: 5.0,
      reviewsCount: 1,
      image: newListing.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      description: newListing.description || "Newly certified authentic local homestay verified via AtithiOS Open Protocol.",
      amenities: ["Self-Certification Safety Verified", "RO Water Provided", "Local Host Families", "Fair Pricing Guarantee"],
      hostName: newListing.hostName || "Verified Host",
      hostBadgeNumber: `IND-${Math.floor(1000 + Math.random() * 9000)}`,
      verificationDate: "Just now",
      compliancePass: [
        "Aadhaar Identity Verification Passed",
        "Fire Safety Check Passed",
        "Hygiene & Sanitation Verified",
        "Open Protocol Registered"
      ]
    };

    setListings((prev) => [formattedListing, ...prev]);

    // Update demo counters dynamically
    setMetrics((prev) => ({
      ...prev,
      hostsOnboarded: prev.hostsOnboarded + 1,
      incomeRedirectedINR: prev.incomeRedirectedINR + 25000
    }));

    return formattedListing;
  };

  const createBooking = (listing, guestDetails) => {
    const nights = guestDetails.nights || 2;
    const totalPaid = guestDetails.totalPaid || (listing.price * nights);
    const totalSaved = guestDetails.totalSaved || ((listing.otaPrice - listing.price) * nights);
    const enteredName = (guestDetails.guestName && guestDetails.guestName.trim()) 
      ? guestDetails.guestName.trim() 
      : "Guest";
    const refNum = `ATITHI-${Date.now().toString().slice(-6)}`;

    const newBooking = {
      id: refNum,
      referenceNumber: refNum,
      listingId: listing.id,
      propertyName: listing.name,
      listingName: listing.name,
      location: listing.location,
      guestName: enteredName,
      dates: guestDetails.dates || `Upcoming Stay (${nights} Nights)`,
      nights: nights,
      guests: guestDetails.guests || 2,
      guestLabel: guestDetails.guestLabel || `${guestDetails.guests || 2} Guests`,
      pricePerNight: listing.price,
      otaPricePerNight: listing.otaPrice,
      totalCost: totalPaid,
      totalPaid: totalPaid,
      savings: totalSaved,
      totalSaved: totalSaved,
      status: "Confirmed",
      image: listing.image,
      bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBookings((prev) => [newBooking, ...prev]);
    setCompletedBooking(newBooking);
    setBookingListing(null);

    // Increment income redirected to host
    setMetrics((prev) => ({
      ...prev,
      incomeRedirectedINR: prev.incomeRedirectedINR + totalSaved
    }));

    return newBooking;
  };

  return (
    <AtithiContext.Provider
      value={{
        activeTab,
        setActiveTab,
        listings,
        addListing,
        selectedListing,
        setSelectedListing,
        bookingListing,
        setBookingListing,
        completedBooking,
        setCompletedBooking,
        bookings,
        createBooking,
        metrics
      }}
    >
      {children}
    </AtithiContext.Provider>
  );
}

export function useAtithi() {
  const context = useContext(AtithiContext);
  if (!context) {
    throw new Error("useAtithi must be used within an AtithiProvider");
  }
  return context;
}
