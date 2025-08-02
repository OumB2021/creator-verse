import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${className}`}
    >
      CreatorVerse
    </Link>
  );
};

export default Logo;
