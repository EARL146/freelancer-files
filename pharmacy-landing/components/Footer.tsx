'use client';

import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact Us'],
    },
    {
      title: 'Services',
      links: [
        'Online Consultation',
        'Prescription Upload',
        'Home Delivery',
        'Health Checkup',
        'Medicine Reminder',
      ],
    },
    {
      title: 'Products',
      links: [
        'Prescription Medicine',
        'Vitamins',
        'Personal Care',
        'Medical Devices',
        'Supplements',
      ],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Refund Policy'],
    },
  ];

  const socialIcons = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">💊</span>
              </div>
              <span className="font-poppins font-bold text-xl">PharmaCare</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted online pharmacy for better health and wellness.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-poppins font-bold text-lg mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-800"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Call Us</p>
              <p className="text-white font-semibold">+1 800 123 4567</p>
              <p className="text-sm text-gray-400">24/7 Support</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email Us</p>
              <p className="text-white font-semibold">support@pharmacare.com</p>
              <p className="text-sm text-gray-400">We respond in 2 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Visit Us</p>
              <p className="text-white font-semibold">123 Health Street</p>
              <p className="text-sm text-gray-400">New York, NY 10001</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 PharmaCare. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Sitemap
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white hover:shadow-xl transition-all cursor-pointer"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
};
