import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            FeedbackHub
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              User Login
            </Link>
            <Link
              to="/a"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            User Login
          </Link>
          <Link
            to="/a"
            className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}
