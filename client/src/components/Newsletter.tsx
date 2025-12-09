import { useState, useEffect } from "react";
import axios from "axios";

export default function Newsletter(props: { API: string }) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const submitNewsletter = async () => {
    // Validate email
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${props.API}/subscribers`, { email });
      setMessage({
        type: "success",
        text: response.data.message || "Subscribed successfully!",
      });
      setEmail("");

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    } catch (err) {
      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      }

      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: "📧",
      title: "Weekly Updates",
      description:
        "Get fresh listings and market insights delivered to your inbox every week.",
    },
    {
      icon: "📈",
      title: "Market Trends",
      description:
        "Stay informed with expert analysis on price trends and investment opportunities.",
    },
    {
      icon: "🎯",
      title: "Exclusive Deals",
      description:
        "Access exclusive listings and special offers reserved for our subscribers.",
    },
    {
      icon: "💡",
      title: "Expert Tips",
      description:
        "Learn buying, selling, and investing strategies from real estate professionals.",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-blue-600 font-semibold text-sm tracking-widest uppercase">
            Stay Updated
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-2 leading-tight">
            Subscribe to Our
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-3">
              Newsletter
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Get exclusive listings, market insights, investment tips, and expert
            advice delivered directly to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        <div
          className={`max-w-2xl mx-auto mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-8 shadow-xl">
            {/* Message Alert */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  message.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                } animate-fade-in`}
              >
                <p className="font-semibold">
                  {message.type === "success" ? "✓" : "✕"} {message.text}
                </p>
              </div>
            )}

            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && submitNewsletter()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={submitNewsletter}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-lg border border-white/60 rounded-xl p-6 hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
}
