import { useState, React } from "react";
import {
  BookOpen,
  Bike,
  Laptop,
  Shield,
  Clock,
  MessageCircle,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  MapPin,
  Zap,
  ArrowRight,
  Menu,
  X,
  Play,
  ChevronDown,
} from "lucide-react";

const Home = () => {
  const [setActiveFeature] = useState(0);
  const features = [
    {
      icon: Shield,
      title: "Verified Students Only",
      description:
        "Access gated by college email. No strangers, just your campus community.",
    },
    {
      icon: Clock,
      title: "List in Under 60 Seconds",
      description:
        "Auto-categorize items via smart title recognition. Sell faster than ever.",
    },
    {
      icon: MessageCircle,
      title: "Safe In-App Chat",
      description:
        "Secure messaging with privacy protection until you're ready to connect.",
    },
    {
      icon: MapPin,
      title: "Campus Delivery",
      description:
        "Meet at designated campus spots or get items delivered to your hostel.",
    },
  ];

  const categories = [
    { icon: BookOpen, name: "Textbooks", count: "500+" },
    { icon: Laptop, name: "Electronics", count: "200+" },
    { icon: Bike, name: "Bikes & Cycles", count: "150+" },
    { icon: Users, name: "Room Items", count: "300+" },
  ];

  const stats = [
    { number: "2000+", label: "Active Students" },
    { number: "5000+", label: "Items Listed" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "<48hrs", label: "Avg. Sale Time" },
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_70%)]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse">
                🎯 Now Live at LPU Campus
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Campus
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {" "}
                  Marketplace
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Buy, sell, and rent textbooks, electronics, bikes, and more
                within your
                <span className="font-semibold text-blue-600">
                  {" "}
                  verified campus community
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Trading Now
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>

                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center mr-3 group-hover:shadow-xl transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-blue-600">Collex?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built specifically for students, by students. Experience the
                safest and fastest way to trade on campus.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-100"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Popular <span className="text-blue-600">Categories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From academic essentials to lifestyle needs, find everything you
                need on campus.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <category.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    {category.count} listings
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It <span className="text-blue-600">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to start buying and selling on campus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sign Up & Verify
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Use your college email to join our verified community. Only
                  real students, no outsiders.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  List or Browse
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create listings in under 60 seconds or browse thousands of
                  items from your peers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Chat & Trade
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect safely through in-app chat and meet at campus pickup
                  points or get delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using Collex to buy, sell, and
              rent campus essentials.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Join Now - It's Free!
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center items-center space-x-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>100% Free to Join</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Verified Students Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Safe & Secure</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
    </>
  );
};

export default Home;
