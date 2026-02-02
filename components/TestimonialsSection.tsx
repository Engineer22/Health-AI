
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "The AI diagnostics have revolutionized how we deliver healthcare. Incredibly accurate and efficient.",
    author: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
  },
  {
    quote: "Real-time monitoring has helped us provide better care to our patients. A true game-changer.",
    author: "Dr. Michael Chen",
    role: "Healthcare Director",
  },
  {
    quote: "The platform's revenue cycle automation has significantly reduced our administrative overhead.",
    author: "Emily Rodriguez",
    role: "Hospital Administrator",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">What Our Users Say</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-8 rounded-lg">
                  <p className="text-white/90 text-lg mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
