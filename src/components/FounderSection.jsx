import founder from "../assets/founder.jpg";

const FounderSection = () => {
  return (
    <section className="py-20 bg-text">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src={founder}
                    alt="Nagasson NIZIGIYIMANA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full flex items-center justify-center">
                  <p className="text-background font-semibold text-center">
                    Founder & CEO
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-text">
                  Meet Our Founder
                </h2>
                <h3 className="text-xl font-semibold text-primary">Nagasson NIZIGIYIMANA</h3>
                <div className="space-y-4">
                  <p className="text-text leading-relaxed">
                    With over 15 years of experience in child welfare and
                    education, Jane Doe founded Bloom for Tomorrow Foundation
                    with a vision to create lasting change in children's lives.
                    Her passion for helping underprivileged children stems from
                    her own experiences working in various communities around
                    the world.
                  </p>
                  <p className="text-text leading-relaxed">
                    Under her leadership, the foundation has helped thousands of
                    children access quality education, healthcare, and proper
                    nutrition. Her innovative approach to sustainable
                    development and community engagement has created a model
                    that continues to inspire positive change.
                  </p>
                  <blockquote className="italic text-primary border-l-4 border-secondary pl-4 my-6">
                    "Every child deserves a chance to bloom and reach their full
                    potential. Our mission is to provide them with the tools and
                    support they need to build a brighter tomorrow."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
