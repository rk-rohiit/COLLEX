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
import { motion } from "framer-motion";
import ContactUs from "./ContactUs";
import FaqSection from "./FaqSection";

const Home = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const scrollVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const gradient = `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`;

  const features = [
    {
      icon: Shield,
      title: "Verified Students Only",
      description: "Access gated by college email.",
    },
    {
      icon: Clock,
      title: "List in Under 60 Seconds",
      description: "Sell faster than ever.",
    },
    {
      icon: MessageCircle,
      title: "Safe In-App Chat",
      description: "Secure messaging system.",
    },
    {
      icon: MapPin,
      title: "Campus Delivery",
      description: "Meet or deliver easily.",
    },
  ];

  const categories = [
    { icon: BookOpen, name: "Textbooks", count: "500+" },
    { icon: Laptop, name: "Electronics", count: "200+" },
    { icon: Bike, name: "Bikes", count: "150+" },
    { icon: Users, name: "Room Items", count: "300+" },
  ];

  const stats = [
    { number: "2000+", label: "Students" },
    { number: "5000+", label: "Listings" },
    { number: "98%", label: "Satisfaction" },
    { number: "<48hrs", label: "Avg Sale" },
  ];

  return (
    <div style={{ background: theme.colors.background }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">

  {/* 🔥 BACKGROUND ANIMATION */}
  <div className="absolute inset-0 -z-10">

    {/* Blob 1 */}
    <div
      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-30 animate-blob"
      style={{
        background: theme.colors.primary,
        top: "-100px",
        left: "-100px",
      }}
    />

    {/* Blob 2 */}
    <div
      className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"
      style={{
        background: theme.colors.secondary,
        bottom: "-100px",
        right: "-100px",
      }}
    />

    {/* Blob 3 */}
    <div
      className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"
      style={{
        background: theme.colors.primary,
        top: "40%",
        left: "50%",
      }}
    />

  </div>

  {/* CONTENT */}
  <div>

    <div
      className="inline-block px-4 py-2 rounded-full mb-6"
      style={{
        background: theme.colors.sectionBg,
        color: theme.colors.primary,
      }}
    >
      🎯 Now Live at LPU
    </div>

    <h1 className="text-5xl font-bold mb-4">
      Your Campus{" "}
      <span style={{ color: theme.colors.primary }}>
        Marketplace
      </span>
    </h1>

    <p className="text-lg mb-8" style={{ color: theme.colors.textLight }}>
      Buy, sell & rent within your campus community
    </p>

    <div className="flex justify-center gap-4 flex-wrap">

      <button
        onClick={() => navigate("/signin")}
        className="px-8 py-3 text-white rounded-full shadow hover:scale-105 transition"
        style={{ background: gradient }}
      >
        Start Now →
      </button>

      <button className="flex items-center gap-2 hover:scale-105 transition">
        <Play /> Watch Demo
      </button>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {stats.map((s, i) => (
        <div key={i}>
          <h2 style={{ color: theme.colors.primary }}>
            {s.number}
          </h2>
          <p style={{ color: theme.colors.textLight }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* FEATURES */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">
          Why <span style={{ color: theme.colors.primary }}>Collex?</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6 px-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow hover:shadow-lg transition"
              style={{ background: "#fff" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-lg mb-4 mx-auto"
                style={{ background: gradient }}
              >
                <f.icon className="text-white" />
              </div>

              <h3>{f.title}</h3>
              <p style={{ color: theme.colors.textLight }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        className="py-20 text-center"
        style={{ background: theme.colors.sectionBg }}
      >
        <h2 className="text-4xl font-bold mb-10">
          Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-6 px-6">
          {categories.map((c, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow"
            >
              <c.icon
                className="mx-auto mb-4"
                style={{ color: theme.colors.primary }}
              />

              <h3>{c.name}</h3>
              <p style={{ color: theme.colors.primary }}>
                {c.count}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ContactUs />
      <FaqSection />

      {/* CTA */}
      <section
        className="py-20 text-center text-white"
        style={{ background: gradient }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start?
        </h2>

        <p className="mb-6">Join Collex today</p>

        <button
          onClick={() => navigate("/signin")}
          className="bg-white px-6 py-3 rounded-full"
          style={{ color: theme.colors.primary }}
        >
          Join Now →
        </button>

        <div className="flex justify-center gap-6 mt-6">
          <CheckCircle /> Free
          <CheckCircle /> Secure
          <CheckCircle /> Verified
        </div>
      </section>

    </div>
  );
};

export default Home;