import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Courses from '../components/Courses';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import whatsappicon from '../assets/whatsapp_icon.png';
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Certifications />
      <Courses />
      <Contact />
      <Gallery /> 
    <a class="whats-app" href="https://wa.me/+917995847197" target="_blank" rel="noopener noreferrer">
  <img src={whatsappicon} alt="WhatsApp" height={100} />
</a>
      <Footer />
    </div>
  );
}

export default Home;