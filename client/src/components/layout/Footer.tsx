import { useEffect, useState } from "react";
import Logo from "@components/layout/Logo";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "About Us", href: "#about" },
      { label: "Our Team", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
    Services: [
      { label: "Project Management", href: "#projects" },
      { label: "Consultation", href: "#about" },
      { label: "Design Services", href: "#about" },
      { label: "Technical Support", href: "#contact" },
    ],
    Resources: [
      { label: "Documentation", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Contact Support", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
    ],
    Legal: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Disclaimer", href: "#" },
    ],
  } as const;

  const socialLinks = [
    { icon: "f", label: "Facebook", href: "#" },
    { icon: "𝕏", label: "Twitter", href: "#" },
    { icon: "in", label: "LinkedIn", href: "#" },
    { icon: "📷", label: "Instagram", href: "#" },
  ] as const;

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 max-w-[1920px]">
          {/* Brand & Tagline */}
          <div
            className={`mb-8 sm:mb-10 md:mb-12 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Logo size="lg" variant="default" layout="icon-only" />
              <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-white">
                SyncHomes
              </h3>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base 2xl:text-lg max-w-md">
              Transforming your real estate vision into reality with innovative
              solutions and expert guidance.
            </p>
          </div>

          {/* Links Grid */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mb-8 sm:mb-10 md:mb-12 transform transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base md:text-lg 2xl:text-xl">
                  {category}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs sm:text-sm md:text-base 2xl:text-lg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

          {/* Bottom Section */}
          <div
            className={`transform transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left - Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  &copy; {currentYear} SyncHomes. All rights reserved.
                </p>
              </div>

              {/* Center - Quick Links */}
              <div className="text-center">
                <div className="flex justify-center gap-6">
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* Right - Social Links */}
              <div className="text-center md:text-right">
                <div className="flex justify-center md:justify-end gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      title={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 flex items-center justify-center transition-all duration-300 group"
                    >
                      <span className="text-gray-300 group-hover:text-white text-lg">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
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
      `}</style>
    </footer>
  );
}
