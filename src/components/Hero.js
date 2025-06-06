import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.jpg';

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-[#0a1a2f]/80" /> {/* Deep blue overlay for readability */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Empower Your Future
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-12 text-slate-200"
          >
            Unlock world-class certifications with Nubekins
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#certifications"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
            >
              Explore Certifications
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;