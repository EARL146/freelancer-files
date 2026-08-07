'use client';

import { motion } from 'framer-motion';
import {
  Pill,
  Apple,
  Baby,
  Heart,
  Leaf,
  Droplet,
  Shield,
  Flower,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 1,
    name: 'Prescription Medicine',
    icon: Pill,
    color: 'from-blue-500 to-blue-600',
    description: 'Doctor-prescribed medications',
    count: '2,450+ items',
  },
  {
    id: 2,
    name: 'Vitamins & Minerals',
    icon: Apple,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Essential nutritional supplements',
    count: '1,890+ items',
  },
  {
    id: 3,
    name: 'Baby Care',
    icon: Baby,
    color: 'from-pink-500 to-pink-600',
    description: 'Safe products for infants',
    count: '850+ items',
  },
  {
    id: 4,
    name: 'Medical Devices',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    description: 'Healthcare measurement tools',
    count: '340+ items',
  },
  {
    id: 5,
    name: 'Herbal Products',
    icon: Leaf,
    color: 'from-green-500 to-green-600',
    description: 'Natural wellness solutions',
    count: '1,250+ items',
  },
  {
    id: 6,
    name: 'First Aid',
    icon: Shield,
    color: 'from-orange-500 to-orange-600',
    description: 'Emergency medical supplies',
    count: '520+ items',
  },
  {
    id: 7,
    name: 'Personal Care',
    icon: Droplet,
    color: 'from-cyan-500 to-cyan-600',
    description: 'Hygiene & grooming products',
    count: '1,680+ items',
  },
  {
    id: 8,
    name: 'Supplements',
    icon: Flower,
    color: 'from-purple-500 to-purple-600',
    description: 'Dietary nutritional support',
    count: '2,120+ items',
  },
];

export const Categories = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="categories"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
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
            Browse Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of healthcare categories to find exactly
            what you need.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1200px' }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateX: 8,
                  rotateY: -8,
                  boxShadow: '0 40px 80px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="group relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-premium dark:shadow-premium-dark hover:shadow-xl transition-all duration-300 text-left overflow-hidden border border-gray-100 dark:border-slate-700"
              >
                {/* Gradient Background Overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${category.color}`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {category.description}
                  </p>
                  <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
