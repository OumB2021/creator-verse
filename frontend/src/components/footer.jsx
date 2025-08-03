const Footer = () => {
  return (
    <footer className="bg-white mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
        <p className="mt-4 text-center text-base text-gray-500">
          &copy; {new Date().getFullYear()} CreatorVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
