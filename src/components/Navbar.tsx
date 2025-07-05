import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex text-2xl font-semibold text-gray-800 hover:text-blue-600 transition"
        >
          <img className="w-8 mr-2" src="../../public/logo.png" alt="" />
          Library Management System
        </Link>
        <div className="flex space-x-6">
          <NavItem to="/books" label="All Books" />
          <NavItem to="/create-book" label="Add Book" />
          <NavItem to="/borrow-summary" label="Borrow Summary" />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="text-gray-600 hover:text-blue-600 transition relative group font-medium"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
