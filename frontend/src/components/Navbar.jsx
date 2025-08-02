import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Creators', path: '/creators' },
    { name: 'Add Creator', path: '/add-creator' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll effect for frosted glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    // Special case for home to ensure exact match
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/80 shadow-sm' 
          : 'bg-white/95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800">
              CreatorVerse
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close' : 'Open'} main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.path}`}
              to={link.path}
              className={`${
                isActive(link.path)
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
