import { useState, useEffect } from "react";
import bg from "@assets/hero_bg.jpg";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: "🏗️", label: "Expert Design" },
    { icon: "📋", label: "Consultation" },
    { icon: "📢", label: "Marketing" },
  ];

  return (
    <section
      className="hero relative min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 sm:left-10 w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-5 sm:right-10 w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 sm:left-40 w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {/* Main Heading */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4">
                Build Your Dream
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text ml-2 sm:ml-3">
                  Home
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg  text-gray-300 max-w-xl">
                Expert consultation, stunning design, and strategic marketing to
                make your property stand out
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <a
                href="#projects"
                className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 text-center"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transform hover:scale-105 transition-all duration-300 text-center"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div
            className={`hidden lg:block transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Floating Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6 animate-float">
                {/* Feature Cards */}
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 transform hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {feature.label}
                      </h3>
                      <p className="text-gray-400 text-sm">Premium Services</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div
                key="decor-1"
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"
              ></div>
              <div
                key="decor-2"
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <a
            href="#about"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-300"
          >
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-50px) scale(1.1);} 66%{transform:translate(-20px,20px) scale(0.9);} }
        @keyframes float { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-20px);} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
