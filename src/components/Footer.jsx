import { Phone } from "lucide-react";
import logo2 from "../assets/logo_2.png";

function Footer() {
  return (
    <footer className="bg-text text-background py-12 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img src={logo2} alt="" className="w-28" />
            <p className="text-gray-300">
              Empowering communities through sustainable development, education,
              and environmental conservation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-background">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-gray-300 hover:text-background"
                >
                  Our Activities
                </a>
              </li>
              <li>
                <a
                  href="#getInvolved"
                  className="text-gray-300 hover:text-background"
                >
                  Get Involved
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-background"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-background">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-background">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-background">
                  Partner with Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-background/10 border border-background/20 focus:outline-none focus:border-primary flex-grow"
              />
              <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-[#388E3C] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-background/10 text-center text-gray-300 italic">
          <p>
            &copy; 2024 Bloom for Tomorrow Association. All rights reserved.
          </p>
          <a
            href="https://wa.me/+25767949343"
            className="flex items-center justify-center"
          >
            <p className="mr-2">Designed and Developed by INSIGHT MARKETING</p>|
            <span className="text-semibold ml-2 text-primary flex item-center">
              <Phone className="w-4 text-primary" /> +25767949343
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
