import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bike,
  Laptop,
  Shield,
  Clock,
  MessageCircle,
  Users,
  MapPin,
  Play,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import theme from "../../theme";
// import { motion } from "framer-motion";
import ContactUs from "./ContactUs";
import FaqSection from "./FaqSection";

const Home = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  // Reusable motion variants for scroll animations
  const scrollVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

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
    <div className="min-h-screen bg-white">
      {/* ===================== HERO SECTION ===================== */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          {/* Tag */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            🎯 Now Live at LPU Campus
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            custom={1}
          >
            Your Campus{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            custom={2}
          >
            Buy, sell, and rent textbooks, electronics, bikes, and more within
            your{" "}
            <span className="font-semibold text-blue-600">
              verified campus community
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            custom={3}
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signin")}
              className={`${theme.gradients.primary} text-white px-8 py-4 ${theme.borderRadius.button} text-lg font-semibold ${theme.gradients.primaryHover} ${theme.shadows.base} ${theme.shadows.hover} cursor-pointer`}
            >
              Start Trading Now
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center mr-3 group-hover:shadow-xl transition-all">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            custom={4}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* ===================== FEATURES SECTION ===================== */}
      <motion.section
        id="features"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">Collex?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for students, by students. Experience the
              safest and fastest way to trade on campus.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 ${
                  theme.borderRadius.card
                } bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border ${
                  activeFeature === index
                    ? "border-blue-400"
                    : "border-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollVariants}
                custom={index + 1}
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===================== CATEGORIES SECTION ===================== */}
      <motion.section
        id="categories"
        className={`py-20 ${theme.gradients.section}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariants}
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
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`bg-white ${theme.borderRadius.card} p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollVariants}
                custom={index + 1}
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========= ContactUs Section */}
      <ContactUs />

      {/* FaqSection */}
      <FaqSection />

      {/* ===================== CTA SECTION ===================== */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scrollVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using Collex to buy, sell, and
            rent campus essentials.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signin")}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Join Now - It's Free!
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </motion.button>

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
      </motion.section>
    </div>
  );
};

export default Home;
