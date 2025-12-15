import { useState, useEffect } from "react";
import Button from "@utils/Button";
import Logo from "@components/layout/Logo";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);

    const sections = document.querySelectorAll("section");
    let currentTab = "home";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop <= 150 && sectionBottom >= 150) {
        currentTab = section.id;
      } else if (sectionTop === 0) {
        currentTab = "home";
      }
    });

    setActiveTab(currentTab);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "#home", id: "home" },
    { label: "SERVICES", href: "#about", id: "about" },
    { label: "PROJECTS", href: "#projects", id: "projects" },
    { label: "TESTIMONIALS", href: "#testimonials", id: "testimonials" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-gradient-to-b from-white to-transparent"
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4 flex justify-between items-center max-w-[1920px]">
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <Logo size="md" variant="text-only" layout="horizontal" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => handleTabClick(item.id)}
                className={`relative text-xs xl:text-sm 2xl:text-base font-semibold transition-colors duration-300 ${
                  activeTab === item.id
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute left-0 w-full h-0.5 2xl:h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
                )}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact">
              <Button
                text="CONTACT"
                className="px-4 xl:px-6 2xl:px-8 py-2 xl:py-2.5 2xl:py-3 text-xs xl:text-sm 2xl:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-shadow"
              />
            </a>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden flex flex-col gap-1 sm:gap-1.5 w-7 sm:w-8 h-7 sm:h-8 justify-center z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 sm:w-6 bg-blue-800 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5 sm:translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-5 sm:w-6 bg-blue-800 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-5 sm:w-6 bg-blue-800 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5 sm:-translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 lg:hidden z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed top-12 sm:top-14 md:top-16 right-0 w-56 sm:w-64 md:w-72 bg-white shadow-2xl lg:hidden z-20 rounded-bl-xl">
            <ul className="flex flex-col gap-1 sm:gap-2 p-4 sm:p-5 md:p-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => handleTabClick(item.id)}
                    className={`block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="border-t pt-2 mt-2">
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    text="CONTACT"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg"
                  />
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
