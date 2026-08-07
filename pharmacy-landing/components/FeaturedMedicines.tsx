'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const medicines = [
  {
    id: 1,
    name: 'Aspirin 500mg',
    category: 'Pain Relief',
    price: '$4.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5f400f6f0?w=300&h=300&fit=crop',
    badge: 'Popular',
  },
  {
    id: 2,
    name: 'Vitamin C Plus',
    category: 'Vitamins',
    price: '$7.99',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550831855-83a5f6904405?w=300&h=300&fit=crop',
    badge: 'Best Seller',
  },
  {
    id: 3,
    name: 'Calcium Tablets',
    category: 'Supplements',
    price: '$5.99',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1576961060910-bdf4ad55bb2a?w=300&h=300&fit=crop',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Multivitamin Pro',
    category: 'Vitamins',
    price: '$12.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=300&h=300&fit=crop',
    badge: 'Featured',
  },
  {
    id: 5,
    name: 'Omega 3 Fish Oil',
    category: 'Supplements',
    price: '$14.99',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4b9e9?w=300&h=300&fit=crop',
    badge: 'Hot Deal',
  },
  {
    id: 6,
    name: 'Probiotic Complex',
    category: 'Digestive Health',
    price: '$16.99',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=300&h=300&fit=crop',
    badge: 'Trending',
  },
];

export const FeaturedMedicines = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900"
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
            Featured Medicines & Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium healthcare products
            trusted by thousands of customers.
          </p>
        </motion.div>

        {/* Medicine Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1200px' }}
        >
          {medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              variants={itemVariants}
              whileHover={{ y: -15, rotateX: 5, rotateY: -5 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-premium dark:shadow-premium-dark hover:shadow-2xl transition-all duration-300"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold rounded-full">
                  {medicine.badge}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600">
                <motion.img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.15 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x400?text=${medicine.name}`;
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
                  {medicine.category}
                </p>

                {/* Title */}
                <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {medicine.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(medicine.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {medicine.rating}
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {medicine.price}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all btn-ripple"
                  >
                    <ShoppingCart size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
