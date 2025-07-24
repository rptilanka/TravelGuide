// import { sampleReviews } from '@/data/sampleData';

export default function Testimonials() {
  const testimonials = [
    {
      id: '1',
      name: 'Jennifer L.',
      location: 'New York, USA',
      rating: 5,
      comment: 'Sarah was absolutely fantastic! She showed us parts of Madrid I never would have found on my own. Her knowledge of history and local culture is impressive. The food recommendations were spot on!',
      trip: 'Madrid Historical Walking Tour',
      avatar: 'JL'
    },
    {
      id: '2',
      name: 'Emma S.',
      location: 'Melbourne, Australia',
      rating: 5,
      comment: 'Kumara showed us the real Sri Lanka! From ancient temples to tea plantations, every moment was magical. His knowledge of local culture and history is incredible.',
      trip: 'Colombo Cultural Tour',
      avatar: 'ES'
    },
    {
      id: '3',
      name: 'Lisa K.',
      location: 'Sydney, Australia',
      rating: 5,
      comment: 'Hiroshi\'s knowledge of Japanese culture is extraordinary. The temple tour was a spiritual and educational experience. He explained traditions with such passion and respect.',
      trip: 'Kyoto Temple Tour',
      avatar: 'LK'
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute inset-0 bg-white bg-opacity-60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from travelers who discovered amazing places with our local guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-8 relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-200 text-4xl">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.comment}
              </p>

              {/* Trip Info */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {testimonial.trip}
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by travelers worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 text-sm">Positive Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 text-sm">Secure Payments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
