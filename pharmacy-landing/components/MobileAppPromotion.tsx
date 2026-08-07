'use client';

import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export const MobileAppPromotion = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-96 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-3 shadow-2xl">
              <div className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 flex flex-col items-center justify-center p-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl mb-4"
                  >
                    💊
                  </motion.div>
                  <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-white text-center mb-2">
                    PharmaCare App
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Download now for exclusive deals!
                  </p>

                  {/* App Store Badges */}
                  <div className="mt-6 space-y-2 w-full">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-gray-900 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold"
                    >
                      <Apple size={16} />
                      App Store
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold"
                    >
                      <Play size={16} />
                      Google Play
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full blur-3xl opacity-20"
            ></motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Download Our Mobile App
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Get the PharmaCare app for a seamless shopping experience. Track
              orders, consult pharmacists, and enjoy exclusive mobile-only deals.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {[
                'One-click ordering',
                'Real-time delivery tracking',
                'Prescription management',
                'Health reminders',
                'Exclusive app-only discounts',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Apple size={20} />
                App Store
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Play size={20} />
                Google Play
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
