import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { number: '150+', label: 'Sri Lankan Guides', icon: '👥' },
    { number: '9', label: 'Provinces Covered', icon: '�️' },
    { number: '5,000+', label: 'Happy Travelers', icon: '🌴' },
    { number: '4.9', label: 'Average Rating', icon: '⭐' }
  ];

  const travelPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Ancient Temples',
      location: 'Anuradhapura, Sri Lanka'
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Tea Plantations',
      location: 'Ella, Sri Lanka'
    },
    {
      url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Golden Beaches',
      location: 'Unawatuna, Sri Lanka'
    },
    {
      url: 'https://images.unsplash.com/photo-1605538883669-825200433431?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Cultural Heritage',
      location: 'Kandy, Sri Lanka'
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Wildlife Safari',
      location: 'Yala National Park, Sri Lanka'
    },
    {
      url: 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Historic Fortresses',
      location: 'Sigiriya, Sri Lanka'
    }
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
      {/* Hero Section with Stunning Travel Background */}
      <section className="relative text-white py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-black/50"></div>
          {/* Floating particles effect */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-white rounded-full opacity-50 animate-bounce"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              About TravelGuide Sri Lanka
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              We&apos;re on a mission to connect travelers with passionate local Sri Lankan guides, 
              creating authentic experiences that showcase the Pearl of the Indian Ocean.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                🏛️
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                �
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                �
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Photo Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Sri Lanka&apos;s Hidden Gems
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient temples to pristine beaches, misty mountains to wildlife sanctuaries - 
              our local guides know the most incredible spots across the Pearl of the Indian Ocean.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelPhotos.map((photo, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                    <p className="text-blue-200 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {photo.location}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with Beautiful Imagery */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-800">
                  TravelGuide Sri Lanka was born from a simple belief: the best way to experience this island paradise 
                  is through the eyes of someone who calls it home.
                </p>
                <p>
                  Founded in 2020 by a team of passionate Sri Lankan travelers and cultural enthusiasts, we set out to create a platform 
                  that would connect curious visitors with knowledgeable local guides. After seeing tourists miss out on the true magic 
                  of Sri Lanka through generic tours, we knew there had to be a better way.
                </p>
                <p>
                  We wanted to showcase Sri Lanka&apos;s rich heritage, from the ancient kingdoms of Anuradhapura and Polonnaruwa 
                  to the colonial charm of Galle Fort, the pristine beaches of the south coast, and the breathtaking hill country. 
                  Today, TravelGuide Sri Lanka has grown into a trusted community of verified local guides and adventurous travelers.
                </p>
                
                {/* Achievement badges */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    🏆 Best Sri Lankan Tourism Platform 2024
                  </div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold">
                    🌱 Sustainable Tourism Sri Lanka Award
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main story image */}
                <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="aspect-[16/10] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1605538883669-825200433431?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Sri Lankan guide with travelers at temple"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Authentic Sri Lankan Experiences</p>
                    </div>
                  </div>
                </div>
                
                {/* Smaller images */}
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Sri Lankan cultural heritage"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Sri Lankan wildlife safari"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating mission card */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  To showcase the true beauty and rich culture of Sri Lanka through authentic, local experiences 
                  while empowering passionate Sri Lankan guides to share their homeland&apos;s treasures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Visual Enhancement */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Impact in Sri Lanka
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a thriving community of Sri Lankan guides and international travelers, one authentic experience at a time.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl mb-6 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                
                {/* Progress bar animation */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                </div>
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

      {/* CTA Section with Stunning Landscape */}
      <section className="relative py-24 text-white overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        >
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-black/60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-white rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-white rounded-full opacity-60 animate-bounce"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of travelers who have discovered authentic Sri Lankan experiences with our local guides. 
              Your next island adventure is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/guides"
                className="group px-10 py-5 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center"
              >
                <span>Find a Guide</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/guide/signup"
                className="group px-10 py-5 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm bg-white/10 hover:shadow-2xl transform hover:scale-105 flex items-center"
              >
                <span>Become a Guide</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex justify-center items-center space-x-8 text-white/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Guides
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                Safe & Secure
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24/7 Support
              </div>
            </div>
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
            Have questions about exploring Sri Lanka or want to learn more about becoming a guide? 
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
