import React, { useState, useRef, useEffect } from 'react';
import { useAtithi } from '../context/AtithiContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Ticket, 
  Compass, 
  Bot, 
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck,
  Building2
} from 'lucide-react';

export default function SupportWidget() {
  const { bookings, setActiveTab } = useAtithi();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [chatLog, setChatLog] = useState([
    {
      id: 'init',
      sender: 'agent',
      text: "Namaste! I am AtithiSahayak, your AtithiOS Support Agent. How can I assist you today?",
      suggestedActions: [
        "Why is AtithiOS cheaper than OTAs?",
        "Check my booking status",
        "Help me onboard as a host",
        "What are the self-certification standards?"
      ],
      payload: null
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatLog, isOpen]);

  // Support Agent Tool 1: Booking Status Lookup
  const toolLookupBooking = (query) => {
    const cleanQuery = query.toLowerCase().replace(/check|booking|status|of|my|pass|for/gi, '').trim();

    if (!cleanQuery) {
      return {
        found: false,
        message: "Please provide your Booking Reference ID (e.g. ATITHI-123456) or the Primary Guest Full Name."
      };
    }

    const match = bookings.find((b) => {
      const ref = (b.referenceNumber || b.id || '').toLowerCase();
      const guest = (b.guestName || '').toLowerCase();
      const prop = (b.propertyName || b.listingName || '').toLowerCase();
      return ref.includes(cleanQuery) || guest.includes(cleanQuery) || prop.includes(cleanQuery);
    });

    if (match) {
      return {
        found: true,
        booking: match,
        message: `I found your confirmed booking pass for ${match.propertyName}!`
      };
    } else {
      return {
        found: false,
        recentCount: bookings.length,
        message: bookings.length > 0 
          ? `I couldn't find a booking matching "${cleanQuery}". You have ${bookings.length} confirmed stay in your account. You can check the "My Bookings" tab or double-check your reference ID.`
          : `No confirmed bookings found for "${cleanQuery}". You haven't confirmed any stays yet. Would you like to explore verified homestays in Discover?`
      };
    }
  };

  // Support Agent Tool 2: Host Onboarding Assistant
  const toolHostOnboardingAdvisor = (query) => {
    const q = query.toLowerCase();
    if (q.includes('fire') || q.includes('extinguisher')) {
      return {
        topic: 'Fire Safety Standard',
        answer: "AtithiOS requires working ABC dry-powder fire extinguishers on each floor and unobstructed stairs. This protects timber and multi-story homestays without forcing hosts into months of municipal red tape.",
        actionTab: 'host'
      };
    }
    if (q.includes('hygiene') || q.includes('water') || q.includes('linen')) {
      return {
        topic: 'Hygiene & Water Standard',
        answer: "Every certified stay must provide fresh sanitized linen per check-in, disinfected bathrooms, and tested potable RO or boiled spring drinking water. Self-certification is backed by traveler check-in photos.",
        actionTab: 'host'
      };
    }
    if (q.includes('fee') || q.includes('commission') || q.includes('cut') || q.includes('percentage') || q.includes('money')) {
      return {
        topic: 'Host Economics & Take Rate',
        answer: "Unlike traditional OTAs that extract 20% to 40% commission, AtithiOS charges a flat 5-8% protocol maintenance fee. Hosts keep 92% to 95% of every single rupee, redirecting thousands of extra rupees directly to local host families.",
        actionTab: 'host'
      };
    }
    return {
      topic: '4-Step Host Onboarding Protocol',
      answer: "Onboarding takes under 3 minutes:\n1. Basic Property Details (rooms, category, photos)\n2. Self-Certification Checklist (fire, hygiene, structural soundness, local ID)\n3. Fair Pricing & Commission Calculator\n4. Verified Host Badge & Instant Decentralized Registry Listing.",
      actionTab: 'host'
    };
  };

  // Support Agent Tool 3: Traveler FAQs
  const toolTravelerFAQ = (query) => {
    const q = query.toLowerCase();
    if (q.includes('cheaper') || q.includes('ota') || q.includes('makemytrip') || q.includes('oyo') || q.includes('price')) {
      return "Commercial portals charge small homestays 20-40% commission and historically enforced anti-competitive price-parity (which resulted in a ₹392 Cr CCI fine). AtithiOS is an open protocol charging only 5-8%, passing the savings directly to you (averaging 18-25% lower prices).";
    }
    if (q.includes('cancel') || q.includes('refund')) {
      return "AtithiOS has a zero-cancellation-markup policy. Direct bookings are settled directly with hosts via UPI at check-in, eliminating corporate middleman withholding and unfair cancellation penalties.";
    }
    if (q.includes('verify') || q.includes('safe') || q.includes('trust')) {
      return "Every listed stay undergoes multi-tier verification: DigiLocker/Aadhaar host authentication, geo-tagged photo verification, and our self-certification safety audit covering fire, structural soundness, and sanitation.";
    }
    return "AtithiOS is India's tourism trust and verification infrastructure. We connect travelers directly to authentic informal homestays and boutique stays with guaranteed transparent pricing and verified safety standards.";
  };

  // Agent Supervisor Loop
  const handleUserSend = (text) => {
    const userText = text || inputMessage;
    if (!userText.trim()) return;

    const newMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setChatLog((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Agent reasoning delay
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let agentResponse;

      // Intent classification
      if (lower.includes('booking') || lower.includes('status') || lower.includes('reference') || lower.includes('atithi-')) {
        const lookup = toolLookupBooking(userText);
        agentResponse = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: lookup.message,
          payload: lookup.found ? { type: 'booking', data: lookup.booking } : null,
          suggestedActions: lookup.found 
            ? ["View in My Bookings tab", "Help me with something else"]
            : ["Browse Stays in Discover", "Help me onboard as a host"]
        };
      } else if (lower.includes('host') || lower.includes('onboard') || lower.includes('certif') || lower.includes('fire') || lower.includes('hygiene')) {
        const advisor = toolHostOnboardingAdvisor(userText);
        agentResponse = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: `[${advisor.topic}]: ${advisor.answer}`,
          payload: { type: 'host_action', tab: advisor.actionTab },
          suggestedActions: [
            "Open Host Compliance Wizard",
            "What are the hygiene standards?",
            "Why is AtithiOS cheaper than OTAs?"
          ]
        };
      } else {
        const faqAnswer = toolTravelerFAQ(userText);
        agentResponse = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: faqAnswer,
          payload: null,
          suggestedActions: [
            "Check my booking status",
            "How do hosts onboard?",
            "View Discover Stays"
          ]
        };
      }

      setChatLog((prev) => [...prev, agentResponse]);
    }, 400);
  };

  return (
    <>
      {/* Floating Agent Launcher Trigger Button */}
      <button 
        id="atithi-support-trigger"
        className="support-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AtithiSahayak Support Chat"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 140,
          background: 'var(--color-primary)',
          color: '#FFFFFF',
          border: '2px solid var(--color-accent)',
          borderRadius: 'var(--radius-full)',
          padding: '12px 18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '13px',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Bot size={20} color="var(--color-accent)" />
        <span>Need Help? Ask AtithiSahayak</span>
      </button>

      {/* Support Chatbot Modal Window */}
      {isOpen && (
        <div 
          className="support-agent-window"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            zIndex: 160,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Agent Header */}
          <div style={{
            background: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(217, 164, 65, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(217, 164, 65, 0.2)',
                border: '1px solid var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)'
              }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>
                  AtithiSahayak
                </div>
                <div style={{ fontSize: '12px', color: '#ffde94', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)' }}></span>
                  <span>Trust & Support Agent</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
              aria-label="Close support chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '14px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#fafbf9'
          }}>
            {chatLog.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? 'var(--color-accent-light)' : '#FFFFFF',
                  color: msg.sender === 'user' ? '#3b2802' : 'var(--color-text-primary)',
                  border: msg.sender === 'user' ? '1px solid rgba(217, 164, 65, 0.4)' : '1px solid var(--color-border)',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '13px',
                  lineHeight: 1.45,
                  boxShadow: 'var(--shadow-sm)',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}

                  {/* Render Live Booking Card if returned by Tool */}
                  {msg.payload?.type === 'booking' && (
                    <div style={{
                      marginTop: '10px',
                      background: 'var(--color-primary-surface)',
                      border: '1px solid rgba(14, 59, 54, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                          #{msg.payload.data.referenceNumber || msg.payload.data.id}
                        </span>
                        <span className="verified-host-badge" style={{ fontSize: '11px', padding: '2px 6px' }}>
                          <CheckCircle2 size={11} color="var(--color-success)" />
                          <span>Confirmed</span>
                        </span>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {msg.payload.data.propertyName || msg.payload.data.listingName}
                      </div>
                      <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
                        Guest: {msg.payload.data.guestName} • {msg.payload.data.dates}
                      </div>
                      <div style={{ marginTop: '6px', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total Paid: ₹{msg.payload.data.totalCost || msg.payload.data.totalPaid}</span>
                        <span style={{ color: 'var(--color-success)' }}>Saved ₹{msg.payload.data.savings || msg.payload.data.totalSaved}</span>
                      </div>
                    </div>
                  )}

                  {/* Render Host Wizard Action Link */}
                  {msg.payload?.type === 'host_action' && (
                    <div style={{ marginTop: '8px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ height: '32px', fontSize: '12px', padding: '0 10px' }}
                        onClick={() => {
                          setActiveTab('host');
                          setIsOpen(false);
                        }}
                      >
                        <span>Open Host Compliance Wizard</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (action === "Open Host Compliance Wizard") {
                            setActiveTab('host');
                            setIsOpen(false);
                          } else if (action === "View in My Bookings tab") {
                            setActiveTab('my-bookings');
                            setIsOpen(false);
                          } else if (action === "Browse Stays in Discover" || action === "View Discover Stays") {
                            setActiveTab('discover');
                            setIsOpen(false);
                          } else {
                            handleUserSend(action);
                          }
                        }}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid var(--color-border)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '11px',
                          color: 'var(--color-primary)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          textAlign: 'left'
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSend();
            }}
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--color-border)',
              background: '#FFFFFF',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask FAQs, check booking, or host help..."
              className="form-input"
              style={{ height: '38px', fontSize: '13px' }}
            />
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ height: '38px', padding: '0 14px' }}
              aria-label="Send support query"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
