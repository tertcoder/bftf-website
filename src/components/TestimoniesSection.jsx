import { useEffect, useState } from "react";
import { apiTestimonies } from "../services/apiTestimonies";
import sarah from "../assets/sarah.jpeg";
import jean from "../assets/Jean.jpg";

const mockTestimonials = [
  {
    name: "Sarah UWIMANA",
    role: "Community Member",
    content:
      "BFTF's youth education program transformed my daughter's future. Their dedication to community development is truly inspiring.",
    profile_image_url: sarah,
  },
  {
    name: "Jean Claude HAKIZIMANA",
    role: "Volunteer",
    content:
      "Being part of BFTF's environmental initiatives has shown me how small actions can create lasting positive change.",
    profile_image_url: jean,
  },
];

const TestimoniesSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await apiTestimonies.getTestimonies({ page: 1 });
        setTestimonials(data?.length ? data : mockTestimonials);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err);
        setTestimonials(mockTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Falling back to mock testimonials due to error:", error);
  }

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full translate-x-20 translate-y-20" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">Impact Stories</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonials container */}
          <div className="relative h-[320px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10 relative">
                  {/* Quote icon */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
                    </svg>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.profile_image_url}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-text text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-secondary font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-text/80 text-lg leading-relaxed italic">
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full mx-1 transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          {/* {testimonials.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-3 bg-white rounded-full shadow-lg text-text hover:text-primary transition-colors border border-gray-100 hover:border-primary/20 group"
                onClick={() =>
                  setCurrentIndex(prev =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-3 bg-white rounded-full shadow-lg text-text hover:text-primary transition-colors border border-gray-100 hover:border-primary/20 group"
                onClick={() =>
                  setCurrentIndex(prev =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default TestimoniesSection;
