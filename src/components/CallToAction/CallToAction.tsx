import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animation variants
const animationVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 },
};

// Text content
const TITLE_TEXT = {
  line1: "Ready to make a difference?",
  line2: "Join StudentVoice today.",
};
const DESCRIPTION_TEXT = "Be part of the change on your campus. Sign up now and start making your voice heard.";
const BUTTON_TEXT = "Sign up with your school email";

/**
 * CallToAction Component
 * 
 * This component renders a call-to-action section with animated text and a sign-up button.
 * It uses Framer Motion for animations and Tailwind CSS for styling.
 */
const CallToAction: React.FC = () => {
  return (
    <div className="bg-blue-700 dark:bg-blue-800">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-extrabold text-white sm:text-4xl font-display"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <span className="block">{TITLE_TEXT.line1}</span>
          <span className="block">{TITLE_TEXT.line2}</span>
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg leading-6 text-blue-200"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {DESCRIPTION_TEXT}
        </motion.p>
        <motion.a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {BUTTON_TEXT}
        </motion.a>
      </div>
    </div>
  );
};

export default CallToAction;
