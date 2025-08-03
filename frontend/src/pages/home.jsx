import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownIcon, PlusIcon } from "@radix-ui/react-icons";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate subtle grid lines for the background
  const gridLines = [];
  for (let i = 0; i < 20; i++) {
    gridLines.push(
      <div
        key={`line-${i}`}
        className="absolute top-0 bottom-0 w-px bg-zinc-100"
        style={{
          left: `${i * 5}%`,
          transform: `translateY(${-scrollY * 0.1}px)`,
          opacity: 0.3 + Math.sin(i * 0.5) * 0.1,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative bg-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {gridLines}
      </div>

      {/* Subtle floating circles */}
      <div className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-zinc-200"
            initial={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)",
              opacity: 0.5,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-zinc-800"
          >
            Welcome to CreatorVerse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 px-10 font-light"
          >
            Discover and connect with amazing content creators from around the
            world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-10"
          >
            <Link
              to="/creators"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 md:py-4 md:text-base md:px-10 transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 "
            >
              <span>Browse Creators</span>
              <ArrowDownIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/add-creator"
              className="px-8 py-3 border-2 border-zinc-800 text-base font-medium rounded-lg text-zinc-800 bg-transparent hover:bg-zinc-50 md:py-4 md:px-10 transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Add Creator</span>
              <PlusIcon className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* <motion.div
            className="mt-16 flex flex-wrap justify-center gap-6 opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-300">10,000+ Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-300">50+ Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">24/7 Support</span>
            </div>
          </motion.div> */}
        </motion.div>

        {/* <motion.div
          className="absolute bottom-8 transform -translate-x-1/2 flex flex-col items-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Home;
