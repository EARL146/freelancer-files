'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pharmacists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    position: 'Chief Pharmacist',
    experience: '15 years',
    certifications: 'PharmD, RPh, MBA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    position: 'Clinical Pharmacist',
    experience: '12 years',
    certifications: 'PharmD, BCPS',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Dr. Emma Wilson',
    position: 'Speciality Pharmacist',
    experience: '10 years',
    certifications: 'PharmD, BPS',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. James Anderson',
    position: 'Consultant Pharmacist',
    experience: '18 years',
    certifications: 'PharmD, FASCP',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  },
];

export const Pharmacists = () => {
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
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
            Meet Our Expert Pharmacists
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our team of certified healthcare professionals is dedicated to your
            wellness and safety.
          </p>
        </motion.div>

        {/* Pharmacists Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ perspective: '1200px' }}
        >
          {pharmacists.map((pharmacist) => (
            <motion.div
              key={pharmacist.id}
              variants={itemVariants}
              whileHover={{
                y: -20,
                rotateX: 8,
                rotateY: -8,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="mb-6 relative inline-block mx-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600"
                >
                  <img
                    src={pharmacist.image}
                    alt={pharmacist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x200?text=${pharmacist.name}`;
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>

                {/* Badge */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">💬</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-premium dark:shadow-premium-dark group-hover:shadow-xl transition-all">
                <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {pharmacist.name}
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                  {pharmacist.position}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p>
                    <span className="font-semibold">Experience:</span>{' '}
                    {pharmacist.experience}
                  </p>
                  <p>
                    <span className="font-semibold">Certifications:</span>{' '}
                    {pharmacist.certifications}
                  </p>
                </div>

                {/* Action Buttons */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Consult
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
