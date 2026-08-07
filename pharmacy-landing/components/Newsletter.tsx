'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export const Newsletter = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 dark:from-emerald-900 dark:via-blue-900 dark:to-emerald-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated with PharmaCare
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, health tips, and the
            latest pharmacy news.
          </p>
        </motion.div>

        {/* Subscription Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>Subscribe</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </motion.button>
        </motion.form>

        {/* Success Message */}
        {subscribed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-white text-sm font-medium"
          >
            ✓ Thanks for subscribing! Check your email for exclusive offers.
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm"
        >
          <div>🔒 Secure & Private</div>
          <div>📧 No Spam Guaranteed</div>
          <div>🎁 Exclusive Offers</div>
        </motion.div>
      </div>
    </section>
  );
};
