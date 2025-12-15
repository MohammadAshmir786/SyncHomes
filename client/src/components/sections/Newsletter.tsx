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
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 sm:top-40 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 sm:-bottom-20 left-20 sm:left-40 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-blue-600 font-semibold text-xs sm:text-sm tracking-widest uppercase">
            Stay Updated
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 mt-2 leading-tight">
            Subscribe to Our
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-2 sm:ml-3">
              Newsletter
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Get exclusive listings, market insights, investment tips, and expert
            advice delivered directly to your inbox.
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
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

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && submitNewsletter()}
                className="flex-1 px-3 sm:px-4 md:px-5 2xl:px-6 py-2 sm:py-3 md:py-4 2xl:py-5 text-sm sm:text-base md:text-lg 2xl:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={submitNewsletter}
                disabled={loading}
                className="px-4 sm:px-6 md:px-8 2xl:px-10 py-2 sm:py-3 md:py-4 2xl:py-5 text-sm sm:text-base md:text-lg 2xl:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
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

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-lg border border-white/60 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl mb-3 sm:mb-4 transform group-hover:scale-125 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-50px) scale(1.1);} 66%{transform:translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-10px);} to { opacity:1; transform:translateY(0);} }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
    </section>
  );
}
