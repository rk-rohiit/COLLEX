import React from "react";
import { Instagram, Twitter, Mail } from "lucide-react";
import Logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <>
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                  {/* <span className="text-white font-bold text-lg">C</span> */}
                  <img
                    src={Logo}
                    alt="Collex Logo"
                    className="object-contain h-16 w-auto"
                  />
                </div>
                <span className="text-2xl font-bold">Collex</span>
              </div>
              <p className="text-gray-400 mb-6">
                The trusted campus marketplace for verified students. Making
                campus trading safe, fast, and reliable.
              </p>
              <div className="flex space-x-4 items-center">
                <span className="text-gray-400">Follow us:</span>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a
                  href="mailto:info@collex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trust & Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Campus Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Report Issue
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Collex. All rights reserved. Made with ❤️ for
              students.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
