import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const features = [
    {
      title: "Expert-Led Training",
      description: "Learn from industry professionals with years of experience",
      icon: "🎓"
    },
    {
      title: "Global Recognition",
      description: "Certifications recognized by top companies worldwide",
      icon: "🌍"
    },
    {
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access",
      icon: "⏰"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
        About Nubekins
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering professionals worldwide with industry-recognized certifications
            and cutting-edge skills for the digital age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block"
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;