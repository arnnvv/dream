"use client";

import { Testimonial, Treck } from "@/lib/db/schema";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  Trophy,
  Mountain,
  Users,
  Clock,
  CheckCircle,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import AchievementsSection from "./Achievements";
import FeaturedTreksCarousel from "./TrackCarousel";
import Rental from "./Rental";
import TravelServices from "./Travle";
import TestimonialsCarousel from "./TestimonalCarousel";

interface HomePageProps {
  treks: Treck[];
  imagesByTrekId: Record<number, { imageUrl: string; order: number | null }[]>;
  testimonials: Testimonial[];
}

const HomePage: React.FC<HomePageProps> = ({
  treks,
  imagesByTrekId,
  testimonials,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Navigation with glass morphism */}
      {/* Modern Navigation */}
      <nav className="fixed w-full z-50 py-6">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Content */}
        <div className="container mx-auto px-8 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center">
              <span className="text-2xl font-bold text-white tracking-wide">
                DREAM
                <span className="text-orange-400">TREKS</span>
                <span className="block h-1 w-0 group-hover:w-full bg-orange-400 transition-all duration-300 absolute bottom-0"></span>
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-12">
              {[
                { href: "/", label: "HOME" },
                { href: "#treks", label: "TREKS" },
                { href: "#achievements", label: "ACHIEVEMENTS" },
                { href: "#testimonials", label: "TESTIMONIALS" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group py-2 text-sm tracking-widest text-white/80 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="#contact"
                className="ml-4 px-6 py-2 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300 tracking-wider border border-orange-400/30"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <HeroCarousel />
      {/* Achievements Section */}
      <AchievementsSection />

      {/* Featured Treks */}
      <FeaturedTreksCarousel treks={treks} imagesByTrekId={imagesByTrekId} />

      {/* Rental Equipment Section */}
      <Rental />

      <TravelServices />

      {/* Testimonials with glass morphism */}
      <TestimonialsCarousel testimonials={testimonials} />

      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
                Dream Treks
              </h3>
              <p className="text-gray-400 mb-6">
                Making your adventure dreams come true with safety and comfort.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Our Treks
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Equipment Rental
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Travel Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  123 Adventure Street, Mumbai, India
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  +91 123 456 7890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  info@dreamtreks.com
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Dream Treks. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Button */}
      <a
        href="tel:+1234567890"
        className="fixed bottom-8 right-8 z-50 bg-white/80 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-3 border border-orange-100"
      >
        <Phone className="w-6 h-6" />
        <span className="font-semibold">Contact Us</span>
      </a>
    </div>
  );
};

export default HomePage;
