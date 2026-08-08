'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Phone } from 'lucide-react';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingCards = [
    {
      id: 1,
      title: 'Aspirin 500mg',
      price: '$4.99',
      rating: '4.8',
      image: '/ASPIRIN.webp',
      delay: 0,
    },
    {
      id: 2,
      title: 'Vitamin C Plus',
      price: '$7.99',
      rating: '4.9',
      image: '/VITAMIN C.webp',
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Calcium Tablets',
      price: '$5.99',
      rating: '4.7',
      image: '/CALCIUM.webp',
      delay: 0.4,
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/gettyimages-2208764628-640x640.jpg"
          alt="Pharmacy Background"
          className="absolute w-full h-full object-cover object-center"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
            style={{
              y: scrollY * 0.5,
            }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white mb-6">
                ✨ Welcome to PharmaCare
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-poppins text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Your Trusted Online
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
                Pharmacy for Better Health
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed"
            >
              Order medicines, healthcare products, and wellness essentials
              anytime with fast, secure, and reliable delivery. Your health
              journey starts here.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group btn-ripple"
              >
                <span>Shop Now</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                <span>Consult a Pharmacist</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex gap-8"
            >
              {[
                { number: '150K+', label: 'Happy Customers' },
                { number: '25K+', label: 'Products' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-emerald-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Floating Cards */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="flex flex-col gap-4 w-72">
              {floatingCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: card.delay, duration: 0.8 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                  className="glass p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/80x80?text=${card.title}`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 font-bold">{card.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">⭐</span>
                        <span className="text-white text-xs">{card.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-white" size={32} />
      </motion.div>
    </section>
  );
};
