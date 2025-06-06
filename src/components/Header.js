import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import nubekins from '../assets/nubekins.png';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Certifications', path: '/#certifications' },
    { name: 'Courses', path: '/#courses' },
    { name: 'Contact', path: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    console.log(`Nav clicked: ${path}, Current path: ${location.pathname}`);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        console.log('Navigating to home page');
        navigate('/');
        setTimeout(() => {
          const sectionId = path.substring(2);
          const element = document.getElementById(sectionId);
          console.log(`Looking for section: ${sectionId}, Found: ${!!element}`);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          } else {
            console.warn(`Section ${sectionId} not found on page`);
          }
        }, 500);
      } else {
        const sectionId = path.substring(2);
        const element = document.getElementById(sectionId);
        console.log(`Looking for section: ${sectionId}, Found: ${!!element}`);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        } else {
          console.warn(`Section ${sectionId} not found on page`);
        }
      }
    } else {
      console.log(`Navigating to route: ${path}`);
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold gradient-text">
            <img src={nubekins} alt="Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.path.startsWith('/#') ? (
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      location.pathname === '/' && window.location.hash === item.path.substring(1)
                        ? 'text-green-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-green-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              console.log('Toggling mobile menu. Current state:', isMobileMenuOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden text-white p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span
                className={`block w-full h-0.5 bg-white ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-white ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-full h-0.5 bg-white ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2.1' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-xl mt-4 p-4 space-y-4 z-50">
            {console.log('Mobile menu rendering')}
            {navItems.map((item) => (
              <div key={item.name}>
                {item.path.startsWith('/#') ? (
                  <button
                    onClick={() => {
                      console.log(`Mobile nav item clicked: ${item.name}, Path: ${item.path}`);
                      handleNavClick(item.path);
                    }}
                    className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg ${
                      location.pathname === '/' && window.location.hash === item.path.substring(1)
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => console.log(`Mobile nav link clicked: ${item.name}, Path: ${item.path}`)}
                    className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;