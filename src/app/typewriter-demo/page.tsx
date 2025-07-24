import TypewriterHighlight from '@/components/TypewriterHighlight';

export default function TypewriterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Typewriter Highlight Effects
          </h1>
          <p className="text-xl text-gray-600">
            Watch every letter get highlighted as it types
          </p>
        </div>

        <div className="space-y-16">
          {/* Example 1: Yellow Highlight */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Yellow Highlight (Default)
            </h2>
            <TypewriterHighlight 
              text="Welcome to our amazing travel guide platform! Every letter highlights as it appears."
              speed={80}
              highlightColor="bg-yellow-300"
              textColor="text-gray-900"
              className="text-2xl font-medium"
            />
          </div>

          {/* Example 2: Blue Highlight */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Blue Highlight - Fast Speed
            </h2>
            <TypewriterHighlight 
              text="Find the perfect local guide for your next adventure!"
              speed={50}
              highlightColor="bg-blue-200"
              textColor="text-blue-900"
              className="text-3xl font-bold"
            />
          </div>

          {/* Example 3: Green Highlight */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Green Highlight - Dark Background
            </h2>
            <TypewriterHighlight 
              text="Explore hidden gems with verified local experts worldwide."
              speed={100}
              highlightColor="bg-green-400"
              textColor="text-white"
              className="text-2xl"
            />
          </div>

          {/* Example 4: Purple Highlight */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Purple Highlight - Slow Speed
            </h2>
            <TypewriterHighlight 
              text="Book authentic experiences today!"
              speed={150}
              highlightColor="bg-purple-300"
              textColor="text-purple-900"
              className="text-4xl font-bold"
            />
          </div>

          {/* Example 5: Red Highlight */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Pink Highlight - Gradient Background
            </h2>
            <TypewriterHighlight 
              text="Join thousands of happy travelers!"
              speed={70}
              highlightColor="bg-pink-200"
              textColor="text-red-900"
              className="text-3xl font-bold"
            />
          </div>

          {/* Example 6: Orange Highlight */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Orange Highlight - Long Text
            </h2>
            <TypewriterHighlight 
              text="Our platform connects travelers with amazing local guides who provide authentic, personalized experiences in destinations around the world. Every guide is verified and rated by previous customers."
              speed={60}
              highlightColor="bg-orange-300"
              textColor="text-orange-900"
              className="text-xl leading-relaxed"
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Use this component anywhere in your application
          </p>
          <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
            {`<TypewriterHighlight text="Your text here" speed={80} highlightColor="bg-yellow-300" />`}
          </code>
        </div>
      </div>
    </div>
  );
}
