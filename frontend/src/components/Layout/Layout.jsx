import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Added pt-16 to account for fixed navbar */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-4 text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} CreatorVerse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
