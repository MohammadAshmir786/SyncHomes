import { useState, useEffect } from "react";
import axios from "axios";

export default function ContactForm(props: { API: string }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const submitContact = async () => {
    if (!contact.name || !contact.email || !contact.phone || !contact.city) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(contact.phone.replace(/\D/g, ""))) {
      setMessage({ type: "error", text: "Please enter a valid phone number" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${props.API}/contacts`, contact);
      setMessage({
        type: "success",
        text: response.data.message || "Contact submitted successfully!",
      });
      setContact({ name: "", email: "", phone: "", city: "" });
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const msg = error.response.data?.message;
          if (status === 400 && msg) {
            setMessage({ type: "error", text: msg });
          } else if (status === 500) {
            setMessage({
              type: "error",
              text: "Server error. Please try again later.",
            });
          } else {
            setMessage({
              type: "error",
              text: msg || "Failed to submit contact. Please try again.",
            });
          }
        } else if (error.request) {
          setMessage({
            type: "error",
            text: "Network error. Please check your connection and try again.",
          });
        } else {
          setMessage({
            type: "error",
            text: "Failed to submit contact. Please try again.",
          });
        }
      } else {
        setMessage({
          type: "error",
          text: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
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
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 mt-2 leading-tight">
                Let's Work
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-2 sm:ml-3">
                  Together
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
              Have a project in mind? We'd love to hear from you. Get in touch
              with us and let's create something amazing together.
            </p>

            <div
              className={`space-y-3 sm:space-y-4 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-lg bg-blue-100 flex items-center justify-center text-xl sm:text-2xl md:text-3xl 2xl:text-4xl">
                  📧
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg 2xl:text-xl">
                    Email
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                    contact@synchomes.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-lg bg-indigo-100 flex items-center justify-center text-xl sm:text-2xl md:text-3xl 2xl:text-4xl">
                  📱
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg 2xl:text-xl">
                    Phone
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-lg bg-blue-100 flex items-center justify-center text-xl sm:text-2xl md:text-3xl 2xl:text-4xl">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg 2xl:text-xl">
                    Location
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base 2xl:text-lg">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>

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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    value={contact.city}
                    onChange={(e) =>
                      setContact({ ...contact, city: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <button
                  onClick={submitContact}
                  disabled={loading}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>✉️</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
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
