'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'traveler' | 'guide'>('traveler');

  const travelerSteps = [
    {
      step: 1,
      title: "Discover Local Guides",
      description: "Browse our curated selection of verified local guides. Use filters to find experts in your destination, preferred language, and interests.",
      details: [
        "Search by location, language, or specialty",
        "Read detailed profiles and reviews",
        "Compare prices and availability",
        "View guide certifications and experience"
      ],
      icon: "🔍"
    },
    {
      step: 2,
      title: "Connect & Plan",
      description: "Message your chosen guide directly to discuss your interests, create a custom itinerary, and plan the perfect experience.",
      details: [
        "Send direct messages to guides",
        "Discuss your interests and preferences",
        "Customize your itinerary together",
        "Get local insights and recommendations"
      ],
      icon: "💬"
    },
    {
      step: 3,
      title: "Book Securely",
      description: "Confirm your booking with secure payment. Get instant confirmation and all the details you need for your adventure.",
      details: [
        "Secure payment processing",
        "Instant booking confirmation",
        "Detailed itinerary and meeting points",
        "24/7 customer support"
      ],
      icon: "✅"
    },
    {
      step: 4,
      title: "Experience & Explore",
      description: "Meet your guide and embark on an authentic local adventure. Discover hidden gems and create unforgettable memories.",
      details: [
        "Meet at the agreed location",
        "Explore with local expertise",
        "Discover hidden gems and local secrets",
        "Take amazing photos and create memories"
      ],
      icon: "🌟"
    },
    {
      step: 5,
      title: "Share Your Experience",
      description: "Leave a review to help future travelers and show appreciation for your guide's expertise and hospitality.",
      details: [
        "Rate your guide and experience",
        "Write a detailed review",
        "Upload photos from your trip",
        "Help other travelers discover great guides"
      ],
      icon: "⭐"
    }
  ];

  const guideSteps = [
    {
      step: 1,
      title: "Apply to Join",
      description: "Submit your application with details about your local expertise, languages, and the unique experiences you can offer.",
      details: [
        "Complete detailed application form",
        "Showcase your local knowledge",
        "Upload profile photos and certifications",
        "Describe your specialties and interests"
      ],
      icon: "📝"
    },
    {
      step: 2,
      title: "Verification Process",
      description: "Our team reviews your application, verifies your identity, and conducts a background check to ensure traveler safety.",
      details: [
        "Identity and background verification",
        "Local knowledge assessment",
        "Review of qualifications and experience",
        "Video interview with our team"
      ],
      icon: "🔍"
    },
    {
      step: 3,
      title: "Create Your Profile",
      description: "Build an attractive profile that showcases your expertise, upload photos, and set your availability and pricing.",
      details: [
        "Write compelling profile description",
        "Upload professional photos",
        "Set your hourly rates and availability",
        "List your specialties and languages"
      ],
      icon: "👤"
    },
    {
      step: 4,
      title: "Connect with Travelers",
      description: "Receive booking requests, communicate with potential travelers, and plan customized experiences based on their interests.",
      details: [
        "Receive and respond to booking requests",
        "Chat with travelers about their interests",
        "Create personalized itineraries",
        "Confirm bookings and meeting details"
      ],
      icon: "🤝"
    },
    {
      step: 5,
      title: "Guide & Earn",
      description: "Share your passion for your city, provide amazing experiences, and earn money doing what you love.",
      details: [
        "Meet travelers and share your expertise",
        "Provide authentic local experiences",
        "Receive payments securely",
        "Build your reputation through reviews"
      ],
      icon: "💰"
    }
  ];

  const benefits = {
    traveler: [
      { title: "Authentic Experiences", description: "Skip the tourist traps and discover authentic local culture", icon: "🌟" },
      { title: "Expert Local Knowledge", description: "Learn from passionate locals who know their city inside out", icon: "🧠" },
      { title: "Personalized Tours", description: "Every experience is customized to your interests and preferences", icon: "🎯" },
      { title: "Safe & Secure", description: "All guides are verified with secure payment processing", icon: "🛡️" },
      { title: "Flexible Booking", description: "Book on your schedule with easy cancellation policies", icon: "📅" },
      { title: "24/7 Support", description: "Get help whenever you need it from our support team", icon: "🆘" }
    ],
    guide: [
      { title: "Flexible Income", description: "Earn money on your own schedule and set your own rates", icon: "💰" },
      { title: "Share Your Passion", description: "Turn your love for your city into a rewarding profession", icon: "❤️" },
      { title: "Meet Amazing People", description: "Connect with travelers from around the world", icon: "🌍" },
      { title: "Professional Growth", description: "Develop your skills and build a professional reputation", icon: "📈" },
      { title: "Marketing Support", description: "We help promote your services to global travelers", icon: "📢" },
      { title: "Secure Payments", description: "Get paid quickly and securely for your services", icon: "💳" }
    ]
  };

  const faqs = [
    {
      question: "How are guides verified?",
      answer: "All guides go through a comprehensive verification process including identity checks, background screening, local knowledge assessment, and video interviews with our team."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "We offer flexible cancellation policies. You can cancel up to 24 hours before your experience for a full refund. Check individual guide policies for specific terms."
    },
    {
      question: "How do payments work?",
      answer: "Payments are processed securely through our platform. Travelers pay when booking, and guides receive payment after completing the experience."
    },
    {
      question: "Can I customize my experience?",
      answer: "Absolutely! All our guides specialize in creating personalized experiences. Message your guide before booking to discuss your interests and preferences."
    },
    {
      question: "What if something goes wrong during my tour?",
      answer: "We provide 24/7 customer support and have emergency protocols in place. All experiences are covered by our traveler protection policy."
    },
    {
      question: "How much can I earn as a guide?",
      answer: "Earnings vary by location, experience, and booking frequency. Guides typically earn $25-75 per hour, with top guides earning significantly more through repeat bookings and excellent reviews."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How TravelGuide Works
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Connecting travelers with local guides for authentic experiences has never been easier.
          </p>
          
          {/* Tab Selector */}
          <div className="inline-flex bg-white bg-opacity-20 rounded-2xl p-2 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('traveler')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'traveler'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              I&apos;m a Traveler
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              I&apos;m a Guide
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {activeTab === 'traveler' ? 'Your Journey as a Traveler' : 'Your Journey as a Guide'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeTab === 'traveler' 
                ? 'Follow these simple steps to discover and book amazing local experiences.'
                : 'Join our community of passionate local guides and start earning money sharing your expertise.'
              }
            </p>
          </div>

          <div className="space-y-16">
            {(activeTab === 'traveler' ? travelerSteps : guideSteps).map((step, index) => (
              <div key={step.step} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex-1">
                  <div className={`max-w-lg ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl">
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TravelGuide?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeTab === 'traveler' 
                ? 'Discover the advantages of booking local guides through our platform.'
                : 'See how TravelGuide helps you build a successful guiding business.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits[activeTab].map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about using TravelGuide.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {activeTab === 'traveler' ? 'Ready to Explore?' : 'Ready to Start Guiding?'}
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {activeTab === 'traveler' 
              ? 'Join thousands of travelers who have discovered authentic experiences with our local guides.'
              : 'Join our community of passionate guides and start sharing your local expertise with travelers worldwide.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {activeTab === 'traveler' ? (
              <>
                <Link
                  href="/guides"
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  Find a Guide
                </Link>
                <Link
                  href="/signup"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
                >
                  Sign Up Free
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/guides"
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  See Our Guides
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get started. Don&apos;t hesitate to reach out!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Contact Support
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
