import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Verified Guides', icon: '👥' },
    { number: '50+', label: 'Countries', icon: '🌍' },
    { number: '10,000+', label: 'Happy Travelers', icon: '✈️' },
    { number: '4.9', label: 'Average Rating', icon: '⭐' }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/team/sarah.jpg',
      bio: 'Former travel blogger turned entrepreneur, passionate about connecting cultures through authentic experiences.',
      initials: 'SJ'
    },
    {
      name: 'Marco Rodriguez',
      role: 'Head of Operations',
      image: '/team/marco.jpg',
      bio: 'Expert in tourism operations with 15 years of experience in the travel industry.',
      initials: 'MR'
    },
    {
      name: 'Aisha Patel',
      role: 'Guide Relations Director',
      image: '/team/aisha.jpg',
      bio: 'Dedicated to building strong relationships with our global network of local guides.',
      initials: 'AP'
    },
    {
      name: 'David Chen',
      role: 'Technology Director',
      image: '/team/david.jpg',
      bio: 'Tech enthusiast focused on creating seamless user experiences for travelers and guides.',
      initials: 'DC'
    }
  ];

  const values = [
    {
      title: 'Authentic Experiences',
      description: 'We believe in genuine, local experiences that go beyond typical tourist attractions.',
      icon: '🌟'
    },
    {
      title: 'Cultural Connection',
      description: 'Building bridges between travelers and local communities through meaningful interactions.',
      icon: '🤝'
    },
    {
      title: 'Safety & Trust',
      description: 'Every guide is verified and vetted to ensure safe, reliable experiences for all travelers.',
      icon: '🛡️'
    },
    {
      title: 'Sustainable Tourism',
      description: 'Supporting local economies and promoting responsible travel practices worldwide.',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About TravelGuide
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to connect travelers with passionate local guides, 
            creating authentic experiences that go beyond the ordinary.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  TravelGuide was born from a simple belief: the best way to experience a destination 
                  is through the eyes of someone who calls it home. Founded in 2020 by a team of 
                  passionate travelers, we set out to create a platform that would connect curious 
                  explorers with knowledgeable locals.
                </p>
                <p>
                  After countless trips where we relied on generic guidebooks and crowded tour groups, 
                  we knew there had to be a better way. We wanted to create genuine connections, 
                  support local communities, and offer travelers the authentic experiences they craved.
                </p>
                <p>
                  Today, TravelGuide has grown into a global community of verified local guides and 
                  adventurous travelers, all united by a shared love of authentic exploration and 
                  cultural exchange.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="text-center">
                {/* Animated About Me Image */}
                <div className="mb-8 flex justify-center">
                  <Image 
                    src="https://github.com/7oSkaaa/7oSkaaa/blob/main/Images/about_me.gif?raw=true" 
                    alt="About Us Animation"
                    width={200}
                    height={200}
                    className="rounded-2xl shadow-lg animate-bounce"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-blue-100 leading-relaxed">
                    To make authentic, local travel experiences accessible to everyone while 
                    empowering passionate locals to share their knowledge and culture with the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a global community of travelers and guides, one authentic experience at a time.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, from the guides we work with to the experiences we curate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of travel enthusiasts, technology experts, and culture advocates 
              working together to revolutionize how people explore the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Ensure Quality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every guide on our platform goes through a rigorous verification process to ensure 
              safe, authentic, and memorable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application & Review</h3>
              <p className="text-gray-600">
                Potential guides submit detailed applications including their background, 
                expertise, and local knowledge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Process</h3>
              <p className="text-gray-600">
                We verify identity, conduct background checks, and assess local expertise 
                through interviews and tests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Quality</h3>
              <p className="text-gray-600">
                Continuous monitoring through traveler feedback, ratings, and regular 
                quality assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join thousands of travelers who have discovered authentic experiences with our local guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Find a Guide
            </Link>
            <Link
              href="/become-guide"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              Become a Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about our platform or want to learn more about becoming a guide? 
            We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">hello@travelguide.com</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900">Phone</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
