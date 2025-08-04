const Footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 right-0 z-50 bg-z mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
        <p className="mt-4 text-center text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} CreatorVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
