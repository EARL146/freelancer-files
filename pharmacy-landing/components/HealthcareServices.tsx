'use client';

import { motion } from 'framer-motion';
import {
  Video,
  Upload,
  Truck,
  Stethoscope,
  Bell,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    id: 1,
    title: 'Online Consultation',
    description: 'Talk to licensed pharmacists via video or chat',
    icon: Video,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Prescription Upload',
    description: 'Upload your prescriptions safely and securely',
    icon: Upload,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Home Delivery',
    description: 'Fast and reliable delivery to your doorstep',
    icon: Truck,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Health Checkup',
    description: 'Book appointments for health screenings',
    icon: Stethoscope,
    color: 'from-red-500 to-red-600',
  },
  {
    id: 5,
    title: 'Medicine Reminder',
    description: 'Never miss a dose with smart reminders',
    icon: Bell,
    color: 'from-orange-500 to-orange-600',
  },
];

export const HealthcareServices = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800"
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
            Our Healthcare Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to meet all your wellness needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          style={{ perspective: '1200px' }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{
                  y: -18,
                  rotateX: 10,
                  rotateY: -10,
                  boxShadow: '0 50px 100px rgba(0, 0, 0, 0.2)',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="group p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-600 text-center overflow-hidden relative"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${service.color} transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  className="relative z-10 mb-4 flex justify-center"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-2 relative z-10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="relative z-10 mt-4"
                >
                  <svg
                    className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
