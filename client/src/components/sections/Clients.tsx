import { useEffect, useState } from "react";
import axios from "axios";
import type { Client } from "@types";
import { PLACEHOLDER_IMAGE } from "@components/Constants";

export default function Clients(props: { API: string }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchClients = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${props.API}/clients`, {
          signal: abortController.signal,
        });
        setClients(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.name === "CanceledError") return;
          if (err.response) {
            setError(err.response.data?.message || "Failed to load clients");
          } else if (err.request) {
            setError("Network error. Please check your connection.");
          } else {
            setError("Failed to load clients");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
    return () => abortController.abort();
  }, [props.API]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE({
      length: 400,
      width: 400,
      text: "Client Image",
    });
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 sm:top-40 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 sm:-bottom-20 left-20 sm:left-40 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-blue-600 font-semibold text-xs sm:text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 leading-tight">
            What Our
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-2 sm:ml-3">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Hear from our satisfied clients about their experience working with
            us and the impact we've made on their projects.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 font-semibold">
                Loading testimonials...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && clients.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-gray-600 text-lg">
              No testimonials to display yet.
            </p>
          </div>
        )}

        {/* Clients Grid */}
        {!loading && !error && clients.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div
                key={client._id}
                className={`transform transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Testimonial Card */}
                <div className="group relative bg-white/80 backdrop-blur-lg border border-white/60 rounded-xl p-6 shadow-md hover:bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow italic">
                    "{client.description}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="flex-shrink-0">
                      <img
                        src={`${props.API}/${client.image}`}
                        alt={client.name}
                        onError={handleImageError}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                      />
                    </div>

                    {/* Client Details */}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        {client.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {client.designation}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Quote Mark */}
                  <div className="absolute top-4 right-6 text-5xl text-blue-100 opacity-50 font-serif">
                    "
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-50px) scale(1.1);} 66%{transform:translate(-20px,20px) scale(0.9);} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
      `}</style>
    </section>
  );
}
