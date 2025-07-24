import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Search & Browse",
      description: "Find local guides by location, language, or specialty. Browse their profiles, reviews, and experience.",
      icon: "🔍"
    },
    {
      step: 2,
      title: "Connect & Plan",
      description: "Message guides directly to discuss your interests and plan a personalized experience that fits your needs.",
      icon: "💬"
    },
    {
      step: 3,
      title: "Book & Pay",
      description: "Book your tour securely with our platform. Pay safely and get instant confirmation for your adventure.",
      icon: "✅"
    },
    {
      step: 4,
      title: "Explore & Enjoy",
      description: "Meet your guide and explore like a local. Discover hidden gems and create unforgettable memories.",
      icon: "🌟"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting with a local guide is simple. Follow these easy steps to start your authentic travel experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-blue-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-300 rounded-full"></div>
                </div>
              )}
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                {/* Step Number */}
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered authentic experiences with our local guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/guides"
                className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
              >
                Find a Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
