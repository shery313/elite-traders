import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Deposit", href: "deposit" },
    { name: "Withdraw", href: "withdraw" },
 
  ];

  return (
    <nav className="w-full fixed top-0 bg-gray-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <h1 className="text-2xl font-bold text-white">
          Elite<span className="text-green-400">Trader</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#signup"
              className="px-4 py-2 bg-green-400 text-black font-semibold rounded-md hover:bg-green-300 transition"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-6 pb-4 flex flex-col space-y-4 text-gray-300">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-2 border-b border-gray-700 hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#signup"
            className="mt-2 w-full text-center px-4 py-2 bg-green-400 text-black font-semibold rounded-md hover:bg-green-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
