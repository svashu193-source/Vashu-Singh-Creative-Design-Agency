import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import EyesAnimation from './components/EyesAnimation';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // nav buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="root-viewport" className="min-h-screen bg-[#0f001c] text-white selection:bg-purple-500/30 selection:text-white">
      {/* Premium Glassmorphic Header */}
      <Header onContactClick={() => handleScrollToSection('contact')} />

      {/* Hero Block (Large Headline, Subheadline, CTA Actions) */}
      <Hero
        onGetStartedClick={() => handleScrollToSection('contact')}
        onViewPortfolioClick={() => handleScrollToSection('portfolio')}
        onAboutUsClick={() => handleScrollToSection('about')}
      />

      {/* About Section - Introduction, Creativity & Quality Focus */}
      <About onContactClick={() => handleScrollToSection('contact')} />

      {/* Services Suite - Video, Photo, Brand, Icons, Marketing */}
      <Services onContactClick={() => handleScrollToSection('contact')} />

      {/* Dynamic Interactive Gaze Tracking Workspace */}
      <EyesAnimation />

      {/* Showcase Portfolio - Filters, Sliders, Details popups */}
      <Portfolio />

      {/* Bento-style Value Proposition Grid */}
      <WhyChooseUs />

      {/* Dynamic Lead Contact Form */}
      <Contact />

      {/* Final Brand Footer (Credits, Copyright, Quick Links) */}
      <Footer />
    </div>
  );
}
