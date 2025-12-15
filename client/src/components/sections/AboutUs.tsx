import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: "🏗️",
      title: "Expert Design",
      description: "Beautiful and functional designs tailored to your needs",
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Cutting-edge solutions using latest technologies",
    },
    {
      icon: "🎯",
      title: "Strategy",
      description: "Data-driven approach to maximize your success",
    },
    {
      icon: "👥",
      title: "Collaboration",
      description: "Work closely with you every step of the way",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 sm:top-40 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 sm:-bottom-20 right-20 sm:right-40 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <span className="text-blue-600 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 mt-2 leading-tight">
                Transforming Visions into
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-2 sm:ml-3">
                  Reality
                </span>
              </h2>
            </div>

            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-700 leading-relaxed max-w-2xl transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              We are a creative and tech-savvy team passionate about crafting
              exceptional experiences. Our mission is to deliver modern,
              responsive solutions using the latest technologies combined with
              user-centric design.
            </p>

            <div
              className={`grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  500+
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                  Projects Delivered
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  98%
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                  Client Satisfaction
                </p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  15+
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                  Years Experience
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <a
                href="#contact"
                className="inline-block px-6 sm:px-8 md:px-10 2xl:px-12 py-3 sm:py-4 2xl:py-5 text-sm sm:text-base md:text-lg 2xl:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-lg border border-white/60 rounded-xl p-6 hover:bg-white hover:shadow-xl transform hover:translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-8">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-50px) scale(1.1);} 66%{transform:translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
      `}</style>
    </section>
  );
}
