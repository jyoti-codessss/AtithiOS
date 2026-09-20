import React, { useState } from 'react';
import { useAtithi } from '../context/AtithiContext';
import { cannedItineraries } from '../data/mockData';
import { 
  Send, 
  Sparkles, 
  Compass, 
  MapPin, 
  Trees, 
  Palmtree, 
  Coffee, 
  Leaf, 
  Star, 
  ArrowRight, 
  Calendar, 
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export default function PlannerModule() {
  const { listings, setSelectedListing, setActiveTab } = useAtithi();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: "Namaste! I am your AtithiOS Smart Trip Assistant. Tell me where in India you'd like to travel, and I'll craft a balanced itinerary with verified local stays that protect your budget.",
      itinerary: null
    }
  ]);

  const quickPrompts = [
    { label: "3 Days in Manali (Old Manali)", icon: Trees, query: "Plan 3 days in Manali with offbeat trails" },
    { label: "Weekend in Rishikesh", icon: Sparkles, query: "Weekend trip to Rishikesh near the Ganges" },
    { label: "Quiet South Goa Getaway", icon: Palmtree, query: "Hidden spots in South Goa Palolem" },
    { label: "Coorg Coffee Plantation", icon: Coffee, query: "Coorg homestay and plantation trip" }
  ];

  const handleSend = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      itinerary: null
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');

    // Generate AI response via keyword matching
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let matchedKey = null;

      if (lower.includes('manali') || lower.includes('himachal') || lower.includes('old manali')) {
        matchedKey = 'manali';
      } else if (lower.includes('rishikesh') || lower.includes('ganga') || lower.includes('tapovan') || lower.includes('yoga')) {
        matchedKey = 'rishikesh';
      } else if (lower.includes('goa') || lower.includes('palolem') || lower.includes('beach')) {
        matchedKey = 'goa';
      } else if (lower.includes('coorg') || lower.includes('madikeri') || lower.includes('coffee') || lower.includes('kodagu')) {
        matchedKey = 'coorg';
      }

      let aiResponse;

      if (matchedKey && cannedItineraries[matchedKey]) {
        const item = cannedItineraries[matchedKey];
        const stay = listings.find((l) => l.id === item.suggestedStayId) || listings[0];

        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Here is a custom curated itinerary for ${item.destination}. I have balanced popular heritage spots with offbeat rural experiences, paired with an AtithiOS Verified Stay:`,
          itinerary: {
            destination: item.destination,
            days: item.days,
            vibe: item.vibe,
            popularSpots: item.popularSpots,
            offbeatSpots: item.offbeatSpots,
            budgetAdvice: item.budgetAdvice,
            suggestedStay: stay
          }
        };
      } else {
        // Smart fallback template
        const fallbackStay = listings[Math.floor(Math.random() * listings.length)];
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Great destination! Here is our recommended 3-Day offbeat blueprint designed to keep tourism revenue in local communities:`,
          itinerary: {
            destination: textToSend.replace(/(plan|trip|in|for|days|weekend)/gi, '').trim() || "Authentic India Destination",
            days: "3 Days / 2 Nights",
            vibe: "Slow travel, local artisan walks & uncommercialized viewpoints",
            popularSpots: [
              "Morning town heritage walk & central historic square",
              "Sunset view from the ridge / riverbank viewpoint",
              "Local produce & spice farmers market"
            ],
            offbeatSpots: [
              "Hike to the adjacent hamlet (ask your local host for the unmarked trail)",
              "Traditional meal prepared with seasonal harvests at a family kitchen",
              "Evening craft workshop with neighborhood artisans"
            ],
            budgetAdvice: "Always choose verified homestays over metropolitan aggregators to ensure fair room prices and direct host support.",
            suggestedStay: fallbackStay
          }
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 350);
  };

  const handleStayClick = (stay) => {
    setSelectedListing(stay);
    setActiveTab('discover');
  };

  return (
    <div className="planner-module">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="verified-host-badge" style={{ marginBottom: '8px' }}>
          <Sparkles size={14} color="#D9A441" />
          <span>Curated Travel Intelligence</span>
        </span>
        <h1 style={{ fontSize: '26px', color: 'var(--color-primary)', marginTop: '4px' }}>
          AI Trip Planner & Stay Matcher
        </h1>
        <p className="text-muted" style={{ fontSize: '14px', maxWidth: '600px', margin: '4px auto 0' }}>
          Get instant, fair-trade travel blueprints. We highlight uncrowded offbeat gems and match you with verified hosts with transparent pricing.
        </p>
      </div>

      {/* Suggested Query Buttons using Lucide icons instead of raw emojis */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '18px' }}>
        {quickPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className="filter-pill"
              onClick={() => handleSend(item.query)}
            >
              <Icon size={14} color="var(--color-primary)" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Box */}
      <div className="chat-container">
        {/* Chat Messages Log */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
            >
              <div style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: msg.itinerary ? '14px' : '0' }}>
                {msg.text}
              </div>

              {/* Render Structured Itinerary if present */}
              {msg.itinerary && (
                <div style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--color-border)', 
                  padding: '18px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} color="var(--color-primary)" />
                      <h4 style={{ fontSize: '16px', color: 'var(--color-primary)' }}>
                        {msg.itinerary.destination}
                      </h4>
                    </div>
                    <span className="protocol-badge">{msg.itinerary.days}</span>
                  </div>

                  <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
                    "{msg.itinerary.vibe}"
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    {/* Popular Highlights */}
                    <div style={{ background: 'var(--color-bg)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Compass size={14} color="var(--color-primary)" />
                        <span>Must-See Highlights</span>
                      </div>
                      <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        {msg.itinerary.popularSpots.map((spot, i) => (
                          <li key={i} style={{ marginBottom: '5px' }}>{spot}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Offbeat Gems */}
                    <div style={{ background: 'var(--color-primary-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(14, 59, 54, 0.2)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Leaf size={14} color="var(--color-success)" />
                        <span>Offbeat Hidden Gems</span>
                      </div>
                      <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--color-primary)' }}>
                        {msg.itinerary.offbeatSpots.map((spot, i) => (
                          <li key={i} style={{ marginBottom: '5px' }}>{spot}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stay Recommendation Card */}
                  {msg.itinerary.suggestedStay && (
                    <div style={{ 
                      border: '1px solid var(--color-accent)', 
                      borderRadius: 'var(--radius-sm)', 
                      padding: '14px', 
                      background: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={msg.itinerary.suggestedStay.image} 
                          alt="Stay" 
                          style={{ width: '64px', height: '54px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#8c6310', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={12} fill="#D9A441" color="#D9A441" />
                            <span>Recommended AtithiOS Verified Stay</span>
                          </div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)' }}>
                            {msg.itinerary.suggestedStay.name}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                            <strong style={{ color: 'var(--color-primary)' }}>₹{msg.itinerary.suggestedStay.price.toLocaleString('en-IN')}/night</strong>
                            {' '}<span style={{ textDecoration: 'line-through', fontSize: '12px', color: 'var(--color-text-secondary)' }}>₹{msg.itinerary.suggestedStay.otaPrice.toLocaleString('en-IN')}</span>
                            {' '}<span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '12px' }}>(Save ₹{(msg.itinerary.suggestedStay.otaPrice - msg.itinerary.suggestedStay.price).toLocaleString('en-IN')})</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        className="btn-accent" 
                        style={{ height: '38px', padding: '0 14px', fontSize: '13px' }}
                        onClick={() => handleStayClick(msg.itinerary.suggestedStay)}
                      >
                        <span>View & Book Stay</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Form with accessible label and 42px controls */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{ 
            display: 'flex', 
            padding: '14px 18px', 
            borderTop: '1px solid var(--color-border)', 
            background: '#FFFFFF',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          <label htmlFor="planner-query-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            Search destination for itinerary
          </label>
          <input 
            id="planner-query-input"
            type="text" 
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask for an itinerary (e.g. 3 days in Manali, hidden spots in Goa, Coorg...)"
            className="form-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary">
            <Send size={15} />
            <span>Plan Trip</span>
          </button>
        </form>
      </div>
    </div>
  );
}
