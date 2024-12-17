import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsDrawerOpen(false);

    // Smooth scroll to section if on home page
    if (window.location.pathname === "/") {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page and then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const navLinks = [
    { name: "Home", href: "/#" },
    { name: "Mission", href: "/#mission" },
    { name: "Activities", href: "/#activities" },
    { name: "Get Involved", href: "/#getInvolved" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Desktop/Mobile Navbar */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => handleNavClick(e, link.href.split("#")[1])}
                className={`${
                  isScrolled ? "text-text" : "text-background"
                } hover:text-primary font-semibold`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => navigate("/donate")}
              className="bg-secondary font-semibold text-background px-6 py-2 rounded-full hover:bg-[#FF5722] transition-colors"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className={`${
                isScrolled ? "text-text" : "text-background"
              } focus:outline-none`}
            >
              {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-text text-background transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 px-6">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={e => handleNavClick(e, link.href.split("#")[1])}
              className="text-2xl font-semibold text-background hover:text-primary"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              navigate("/donate");
              setIsDrawerOpen(false);
            }}
            className="bg-secondary font-semibold text-background px-8 py-3 rounded-full hover:bg-[#FF5722] transition-colors text-xl"
          >
            Donate
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
