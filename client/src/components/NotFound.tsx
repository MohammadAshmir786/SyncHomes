import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

export default function NotFound() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  usePageMeta({
    title: "Page Not Found | SyncHomes",
    description:
      "The page you are looking for could not be found on SyncHomes.",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Animated 404 Number */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="text-9xl md:text-10xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text animate-pulse">
                404
              </div>
              <div className="absolute inset-0 text-9xl md:text-10xl font-bold text-blue-500 opacity-20 blur-3xl animate-pulse">
                404
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className={`transform transition-all duration-1000 delay-100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              Oops! It seems the page you're looking for has taken a wrong turn.
              Let's get you back on track!
            </p>
          </div>

          {/* Illustration Area */}
          <div
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative w-64 h-64 mx-auto mb-8">
              {/* Floating Houses */}
              <div className="absolute top-0 left-8 animate-bounce animation-delay-0">
                <div className="text-6xl">🏠</div>
              </div>
              <div className="absolute top-12 right-8 animate-bounce animation-delay-2000">
                <div className="text-6xl">🏡</div>
              </div>
              <div className="absolute bottom-12 left-4 animate-bounce animation-delay-4000">
                <div className="text-6xl">🏘️</div>
              </div>
              <div className="absolute bottom-0 right-4 animate-bounce animation-delay-1000">
                <div className="text-6xl">🏢</div>
              </div>

              {/* Center Compass/Direction */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-32 rounded-full border-4 border-blue-400 border-opacity-30 animate-spin"
                  style={{ animationDuration: "8s" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`transform transition-all duration-1000 delay-300 flex flex-col sm:flex-row gap-4 justify-center ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Go Home Button */}
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              Go Home
            </button>

            {/* Contact Support Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                  navigate("/");
                }
              }}
              className="px-8 py-3 border-2 border-blue-400 text-blue-300 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-400/10"
            >
              Contact Support
            </button>
          </div>

          {/* Additional Info */}
          <div
            className={`transform transition-all duration-1000 delay-400 mt-12 pt-8 border-t border-blue-400/30 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl">🗺️</div>
                <h3 className="text-white font-semibold">Explore More</h3>
                <p className="text-gray-400 text-sm">
                  Check out our amazing projects and services
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">💬</div>
                <h3 className="text-white font-semibold">Need Help?</h3>
                <p className="text-gray-400 text-sm">
                  Reach out to our support team
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">📱</div>
                <h3 className="text-white font-semibold">Stay Connected</h3>
                <p className="text-gray-400 text-sm">
                  Follow us for latest updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
