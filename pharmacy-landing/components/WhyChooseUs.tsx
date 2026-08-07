'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle,
  Zap,
  Lock,
  Clock,
  Users,
  Award,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    id: 1,
    title: 'Licensed Pharmacy',
    description: 'Fully certified and regulated by healthcare authorities',
    icon: Award,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 2,
    title: 'Authentic Medicines',
    description: '100% genuine products from verified manufacturers',
    icon: CheckCircle,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Get your orders delivered within 24-48 hours',
    icon: Zap,
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 4,
    title: 'Secure Payments',
    description: 'Bank-level encryption for safe transactions',
    icon: Lock,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 5,
    title: 'Certified Pharmacists',
    description: 'Expert guidance from qualified professionals',
    icon: Users,
    color: 'text-pink-600 dark:text-pink-400',
  },
  {
    id: 6,
    title: '24/7 Support',
    description: 'Round-the-clock customer service available',
    icon: Clock,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
];

export const WhyChooseUs = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose PharmaCare?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the difference with our commitment to quality, safety,
            and customer satisfaction.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1200px' }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  rotateY: 10,
                  boxShadow: '0 40px 80px rgba(0, 0, 0, 0.15)',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="group p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-premium dark:shadow-premium-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all">
                    <Icon size={32} className={feature.color} />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Border Animation */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10+', label: 'Years in Business' },
            { number: '99.9%', label: 'Accuracy Rate' },
            { number: '10K+', label: 'Daily Orders' },
            { number: '500+', label: 'Pharmacists' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl"
            >
              <div className="font-poppins text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                {stat.number}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
