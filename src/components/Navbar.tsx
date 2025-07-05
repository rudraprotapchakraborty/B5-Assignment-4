import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-xl sm:text-2xl font-semibold text-gray-800 hover:text-blue-600 transition"
        >
          <img className="w-6 sm:w-8 mr-2" src="/logo.png" alt="Logo" />
          <span className="whitespace-nowrap">Library Management System</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden sm:flex space-x-6">
          <NavItem to="/books" label="All Books" />
          <NavItem to="/create-book" label="Add Book" />
          <NavItem to="/borrow-summary" label="Borrow Summary" />
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col space-y-3">
          <NavItem
            to="/books"
            label="All Books"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="/create-book"
            label="Add Book"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="/borrow-summary"
            label="Borrow Summary"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

type NavItemProps = {
  to: string;
  label: string;
  onClick?: () => void; 
};

function NavItem({ to, label, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition relative group font-medium"
    >
      {label}
      <span className="hidden sm:block absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
