'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  { id: 1, number: 150000, label: 'Happy Customers', suffix: '+' },
  { id: 2, number: 25000, label: 'Products', suffix: '+' },
  { id: 3, number: 500, label: 'Pharmacists', suffix: '+' },
  { id: 4, number: 99, label: 'Customer Satisfaction', suffix: '%' },
];

const AnimatedCounter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let currentCount = 0;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      currentCount = Math.floor(stepValue * stepCount);
      if (currentCount > target) {
        currentCount = target;
      }
      setCount(currentCount);

      if (stepCount >= steps) {
        clearInterval(interval);
        setCount(target);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [target, inView]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
      {formatNumber(count)}{suffix}
    </div>
  );
};

export const Statistics = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 dark:from-emerald-900 dark:via-blue-900 dark:to-emerald-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-white/80">
            See the impact of PharmaCare in the healthcare industry
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <motion.div animate={inView ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                <AnimatedCounter
                  target={stat.number}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </motion.div>
              <p className="text-white/80 text-lg font-medium mt-4">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
