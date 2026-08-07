'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const faqs = [
  {
    id: 1,
    question: 'How do I place an order?',
    answer:
      'Simply browse our product catalog, add items to your cart, and proceed to checkout. You can pay securely using credit cards, debit cards, or digital wallets.',
  },
  {
    id: 2,
    question: 'What is the delivery timeframe?',
    answer:
      'We offer delivery within 24-48 hours for most locations. Express delivery is available for urgent orders. Delivery time is calculated based on your location and order time.',
  },
  {
    id: 3,
    question: 'Do you require a prescription for medicines?',
    answer:
      'For prescription medicines, you need to upload a valid prescription from a licensed healthcare provider. You can upload it during checkout or through our mobile app.',
  },
  {
    id: 4,
    question: 'Is my personal information safe?',
    answer:
      'Yes, we use bank-level encryption and follow all healthcare privacy regulations. Your payment and medical information are completely secure.',
  },
  {
    id: 5,
    question: 'Can I return or exchange medicines?',
    answer:
      'Due to safety regulations, unopened medicines can be returned within 7 days. Opened or used medicines cannot be returned for safety reasons.',
  },
  {
    id: 6,
    question: 'How can I consult a pharmacist?',
    answer:
      'You can consult our certified pharmacists via video call, chat, or phone. Use the "Consult a Pharmacist" button to schedule a consultation.',
  },
];

export const FAQ = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our services and policies.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-premium dark:shadow-premium-dark overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <motion.button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="font-poppins font-semibold text-lg text-gray-900 dark:text-white text-left">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={24}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedId === faq.id ? 'auto' : 0,
                  opacity: expandedId === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
