import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all border-b border-b-background/25 duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
        <img
          src={logo}
          alt="Logo - Bloom for Tomorrow Foundation"
          className="w-28"
          />
          </Link>
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/#"
            className={`${
              isScrolled ? "text-text" : "text-background"
            } hover:text-primary font-semibold`}
          >
            Home
          </a>
          <a
            href="/#mission"
            className={`${
              isScrolled ? "text-text" : "text-background"
            } hover:text-primary font-semibold`}
          >
            Mission
          </a>
          <a
            href="/#activities"
            className={`${
              isScrolled ? "text-text" : "text-background"
            } hover:text-primary font-semibold`}
          >
            Activities
          </a>
          
          <a
            href="/#getInvolved"
            className={`${
              isScrolled ? "text-text" : "text-background"
            } hover:text-primary font-semibold`}
          >
            Get Involved
          </a>
          <a
            href="/#contact"
            className={`${
              isScrolled ? "text-text" : "text-background"
            } hover:text-primary font-semibold`}
          >
            Contact
          </a>
          <button
            onClick={() => navigate("/donate")}
            className="bg-secondary font-semibold text-background px-6 py-2 rounded-full hover:bg-[#FF5722] transition-colors"
          >
            Donate
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
