export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-400 py-8 px-6 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-base tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Library Management System</span>. All rights reserved.
        </p>
        <a
          href="https://github.com/rudraprotapchakraborty/B5-Assignment-4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base text-blue-400 hover:text-blue-300 transition duration-200 underline underline-offset-4"
        >
          GitHub Repo ↗
        </a>
      </div>
    </footer>
  );
}
