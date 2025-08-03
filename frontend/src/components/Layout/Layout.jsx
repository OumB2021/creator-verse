import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";
import { useEffect, useState } from "react";

const Layout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientPosition = {
    "--x": `${mousePosition.x}px`,
    "--y": `${mousePosition.y}px`,
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col relative overflow-hidden">
      {/* Subtle animated background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(244, 244, 245, 0.8) 0%, transparent 70%)',
          ...gradientPosition,
          transition: 'background-position 0.1s ease-out',
          zIndex: 0,
        }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
