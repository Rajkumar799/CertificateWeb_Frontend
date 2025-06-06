import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/gallery`)
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching gallery images:', error));
  }, []);

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
          Our Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((image, idx) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-lg glass group"
            >
              <img
                src={image.image}
                alt="Gallery"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-2xl"
              />
              {/* Optional: Overlay for hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Gallery;