import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 right-0 z-50 bg-zinc-900 mt-8">
      <div className="max-w-7xl mx-auto p-10 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} CreatorVerse. All rights reserved.
          </p>
          <div className="flex space-x-2">
            <a
              href="https://github.com/oumarcreatorverse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub repository"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/oumarcreatorverse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub repository"
            >
              <LinkedInLogoIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
