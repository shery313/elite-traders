import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Elite<span className="text-green-400">Trader</span>
          </h1>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            A trusted platform for smart investments in stocks, crypto, forex,
            commodities, and global markets.  
            Your financial growth is our priority.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5 text-xl">
            <a href="#" className="hover:text-green-400"><FaFacebook /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#dashboard" className="hover:text-green-400">Dashboard</a></li>
            <li><a href="#markets" className="hover:text-green-400">Markets</a></li>
            <li><a href="#portfolio" className="hover:text-green-400">Portfolio</a></li>
            <li><a href="#education" className="hover:text-green-400">Education</a></li>
          </ul>
        </div> */}

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><a href="#fbr-certificate" className="hover:text-green-400">FBR Tax Certificate</a></li>
            <li><a href="#company-registration" className="hover:text-green-400">Company Registration</a></li>
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li>Email: <span className="text-green-400">support@elitetrader.com</span></li>
            <li>Phone: <span className="text-green-400">+92 300 1234567</span></li>
            <li>Location: Karachi, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Elite Trader Company — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
