import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('#home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    // Intersection observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Matches when section occupies center viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'projects', 'experience', 'contact'].map(id => 
      document.getElementById(id)
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <a href="#home" className="nav-logo">
          PORTFOLIO.
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href} className="nav-link-item">
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setActiveSection(link.href);
                }}
              >
                {link.name}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="nav-active-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Scroll Progress Bar */}
        <div className="scroll-progress-container">
          <div 
            className="scroll-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>
    </div>
  );
}
