import youth from "../assets/youth.png";
import community from "../assets/community_hearth.jpg";
import environment_project from "../assets/environment_project.png";
import hero from "../assets/hero-1.jpg";
import sarah from "../assets/sarah.jpeg";
import jean from "../assets/Jean.jpg";
import logo2 from "../assets/logo_2.png";
import NavBar from "./NavBar";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const icons = {
  ChevronRight: () => (
    <svg
      className="w-4 h-4 ml-1"
      fill="none"
      stroke="#37474F"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  Heart: () => (
    <svg className="w-16 h-16" fill="none" stroke="#37474F" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  Users: () => (
    <svg className="w-16 h-16" fill="none" stroke="#37474F" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-16 h-16" fill="none" stroke="#37474F" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6" fill="none" stroke="#FDF5E6" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Phone: () => (
    <svg className="w-6 h-6" fill="none" stroke="#FDF5E6" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-6 h-6" fill="none" stroke="#FDF5E6" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-6 h-6" fill="#FDF5E6" viewBox="0 0 24 24">
      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
    </svg>
  ),
  Twitter: () => (
    <svg className="w-6 h-6" fill="#FDF5E6" viewBox="0 0 24 24">
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-6 h-6" fill="#FDF5E6" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Linkedin: () => (
    <svg className="w-6 h-6" fill="#FDF5E6" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
};
const testimonials = [
  {
    name: "Sarah UWIMANA",
    role: "Community Member",
    quote:
      "BFTF's youth education program transformed my daughter's future. Their dedication to community development is truly inspiring.",
    image: sarah,
  },
  {
    name: "Jean Claude HAKIZIMANA",
    role: "Volunteer",
    quote:
      "Being part of BFTF's environmental initiatives has shown me how small actions can create lasting positive change.",
    image: jean,
  },
];

const activities = [
  {
    title: "Youth Education",
    description:
      "Empowering young minds through quality education and mentorship programs.",
    image: youth,
  },
  {
    title: "Community Health",
    description:
      "Providing accessible healthcare services and wellness education to communities.",
    image: community,
  },
  {
    title: "Environmental Projects",
    description:
      "Creating sustainable solutions for a greener, cleaner future.",
    image: environment_project,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <NavBar />
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-text/70 z-10"></div>
        <div className="relative h-full overflow-hidden">
          <img
            src={hero}
            alt="Hero"
            className="absolute w-full h-full object-cover transition-opacity duration-1000"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-background mb-6">
              Empowering Communities, Inspiring Change
            </h1>
            <p className="text-xl text-background mb-8 max-w-2xl mx-auto">
              Join us in creating lasting positive impact through education,
              health, and environmental initiatives.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-secondary text-background px-8 py-3 rounded-full text-lg hover:bg-[#FF5722] transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-backtext-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Our Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-backtext-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <button className="text-primary hover:text-[#388E3C] font-medium flex items-center">
                    Read More {icons.ChevronRight}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/activities-posts")}
            className="bg-secondary p-4 rounded-full flex mx-auto mt-16 text-background font-semibold"
          >
            See All Activities <ArrowRight />
          </button>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            How to Get Involved
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              {icons.Heart}
              <h3 className="text-xl font-bold text-text mb-2">Donate</h3>
              <p className="text-gray-600 mb-4">
                Support our mission with a one-time or recurring donation
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-secondary text-background px-6 py-2 rounded-full hover:bg-[#FF5722] transition-colors"
              >
                Donate Now
              </button>
            </div>
            <div className="text-center">
              {icons.Users}
              <h3 className="text-xl font-bold text-text mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Join our community of dedicated volunteers
              </p>
              <button className="bg-primary text-background px-6 py-2 rounded-full hover:bg-[#388E3C] transition-colors">
                Join Us
              </button>
            </div>
            <div className="text-center">
              {icons.BookOpen}
              <h3 className="text-xl font-bold text-text mb-2">Partner</h3>
              <p className="text-gray-600 mb-4">
                Collaborate with us to create bigger impact
              </p>
              <button className="bg-primary text-background px-6 py-2 rounded-full hover:bg-[#388E3C] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-backtext-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Impact Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#FDF5E6] rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-text">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-text text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  {icons.Mail}
                  <span>contact@bftf.org</span>
                </div>
                <div className="flex items-center">
                  {icons.Phone}
                  <span>+257 65 849 761</span>
                </div>
                <div className="flex items-center">
                  {icons.MapPin}
                  <span>Bujumbura, Burundi</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                {icons.Facebook}
                {icons.Twitter}
                {icons.Instagram}
                {icons.LinkedIn}
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary"
                />
                <select className="w-full px-4 py-2 rounded-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary">
                  <option value="">Select Subject</option>
                  <option value="partnership">Partnership</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="donation">Donation Support</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary"
                ></textarea>
                <button className="bg-primary text-background px-6 py-2 rounded-full hover:bg-[#388E3C] transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-background py-12 border-t border-background/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logo2} alt="" className="w-28" />
              <p className="text-gray-300">
                Empowering communities through sustainable development,
                education, and environmental conservation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Our Activities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Get Involved
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
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
                  className="px-4 py-2 rounded-l-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary flex-grow"
                />
                <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-[#388E3C] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/10 text-center text-gray-300">
            <p>
              &copy; 2024 Bloom for Tomorrow Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
