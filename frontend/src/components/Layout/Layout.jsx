import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0"></div>
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
