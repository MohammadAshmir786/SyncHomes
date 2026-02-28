import { Navbar, Footer } from "@components/layout";
import {
  Hero,
  AboutUs,
  Projects,
  Clients,
  ContactForm,
  Newsletter,
} from "@components/sections";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Landing() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />
      <Hero />
      <AboutUs />
      <Projects API={API} />
      <Clients API={API} />
      <ContactForm API={API} />
      <Newsletter API={API} />
      <Footer />
    </div>
  );
}
