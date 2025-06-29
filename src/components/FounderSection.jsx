import founder from "../assets/founder.jpg";

const FounderSection = () => {
  return (
    <section className="py-20 bg-text">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src={founder}
                    alt="Nagasson NIZIGIYIMANA"
                    className="w-full h-full object-cover grayscale"
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
                <h3 className="text-xl font-semibold text-primary">
                  Nagasson NIZIGIYIMANA
                </h3>
                <div className="space-y-4">
                  <p className="text-text italic leading-relaxed">
                    Every child deserves to grow up with dignity, hope and a
                    promising future. Faced with the heartbreaking reality of
                    malnutrition and child vulnerability, I felt a deep calling
                    to take action. It's not just about providing aid, but about
                    justice and humanity.
                  </p>
                  <p className="text-text italic leading-relaxed">
                    My association was born from this conviction: to offer
                    children in need not only food but also comfort,
                    opportunities, and true hope. Together, we can make a
                    difference, one child at a time.
                  </p>
                  {/* 
                  <p className="text-text leading-relaxed">
                    With over 15 years of experience in child welfare and
                    education, Nagasson NIZIGIYIMANA founded Bloom for Tomorrow
                    Association with a vision to create lasting change in
                    children's lives. His passion for helping underprivileged
                    children stems from his own experiences working in various
                    communities around the world.
                  </p>
                  <p className="text-text leading-relaxed">
                    Under his leadership, the association has helped thousands of
                    children access quality education, healthcare, and proper
                    nutrition. His innovative approach to sustainable
                    development and community engagement has created a model
                    that continues to inspire positive change.
                  </p>
                  <blockquote className="italic text-primary border-l-4 border-secondary pl-4 my-6">
                    "Every child deserves a chance to bloom and reach their full
                    potential. Our mission is to provide them with the tools and
                    support they need to build a brighter tomorrow."
                  </blockquote> */}
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
