import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import certificationBanner from '../assets/certification-banner.jpg';
import whatsappicon from '../assets/whatsapp_icon.png';
import './Home.css'; // Import the CSS file for styling

function CertificationPage() {
  const { id } = useParams();
  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/certifications`)
      .then(response => {
        setCertifications(response.data);
        if (id) {
          const cert = response.data.find(c => c._id === id);
          setSelectedCert(cert || response.data[0]);
        } else {
          setSelectedCert(response.data[0]);
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 to-green-600/50 z-10" />
            <img
              src={certificationBanner}
              alt="Certifications"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                Professional Certifications
              </h1>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/3"
            >
              <div className="glass rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Available Certifications</h2>
                <ul className="space-y-3">
                  {certifications.map(cert => (
                    <motion.li
                      key={cert._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCert(cert)}
                      className={`cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                        selectedCert?._id === cert._id
                          ? 'bg-gradient-to-r from-green-600 to-green-600 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {cert.title}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3"
            >
         
              <AnimatePresence mode="wait">
                {selectedCert && (
                  <motion.div
                    key={selectedCert._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-xl p-8"
                  >
                    <h2 className="text-3xl font-bold mb-6 gradient-text">{selectedCert.title}</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <div className="glass rounded-lg p-4">
                          <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                          <p className="text-gray-300">{selectedCert.description}</p>
                        </div>
                        <div className="glass rounded-lg p-4">
                          <h3 className="text-xl font-semibold mb-3 text-white">Duration</h3>
                          <p className="text-gray-300">{selectedCert.duration}</p>
                        </div> */}
                      </div>
                      
                      <div className="glass rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-3 text-white">Key Details</h3>
                        <ul className="space-y-3">
                          {selectedCert.details.map((detail, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start space-x-3 text-gray-300"
                            >
                              <span className="text-green-400 mt-1">•</span>
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full"
                        onClick={() => window.location.href = '#contact'}
                      >
                        Apply Now
                      </motion.button> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>
            <a class="whats-app" href="https://wa.me/+917995847197" target="_blank" rel="noopener noreferrer">
              <img src={whatsappicon} alt="WhatsApp" height={100} />
            </a>
      <Footer />
    </div>
  );
}

export default CertificationPage;