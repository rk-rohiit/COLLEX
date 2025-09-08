import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import theme from "../../theme";

const faqs = [
  {
    question: "What is Collex?",
    answer:
      "Collex is your campus marketplace, where students can buy, sell, and exchange products and services within their college community.",
  },
  {
    question: "How do I sell my products?",
    answer:
      "Simply create an account, upload your product details, set your price, and start receiving offers from your campus peers.",
  },
  {
    question: "Is Collex free to use?",
    answer:
      "Yes! Collex is completely free for all students. We aim to make campus buying and selling effortless and secure.",
  },
  {
    question: "Is my data safe on Collex?",
    answer:
      "Absolutely. We prioritize your privacy and implement secure authentication and data protection mechanisms to keep your information safe.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-16 px-6 md:px-12 lg:px-20 ${theme.gradients.section}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${theme.colors.textDark}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked <span className="text-blue-600">Questions</span>
        </motion.h2>
        <motion.p
          className={`text-lg md:text-xl mb-10 ${theme.colors.textLight}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Got questions? We've got answers! Here’s everything you need to know
          about Collex.
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white ${theme.borderRadius.card} ${theme.shadows.base} border border-gray-100`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-lg font-semibold text-gray-900">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="px-6 pb-5 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
