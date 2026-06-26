import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollBackgroundTransition() {
  const [activeSection, setActiveSection] = useState('home');
  
  const { scrollY } = useScroll();
  const sections = ['home', 'about', 'projects', 'experience', 'contact'];
  
  const bgColors = {
    home: { primary: 'rgba(6, 182, 212, 0.03)', secondary: 'rgba(168, 85, 247, 0.02)' },
    about: { primary: 'rgba(168, 85, 247, 0.03)', secondary: 'rgba(6, 182, 212, 0.02)' },
    projects: { primary: 'rgba(236, 72, 153, 0.03)', secondary: 'rgba(6, 182, 212, 0.02)' },
    experience: { primary: 'rgba(6, 182, 212, 0.03)', secondary: 'rgba(16, 185, 129, 0.02)' },
    contact: { primary: 'rgba(16, 185, 129, 0.03)', secondary: 'rgba(6, 182, 212, 0.02)' }
  };

  const [currentBg, setCurrentBg] = useState(bgColors.home);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
          setActiveSection(section);
          setCurrentBg(bgColors[section]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -2,
        background: `radial-gradient(circle at 50% 50%, ${currentBg.primary} 0%, ${currentBg.secondary} 50%, transparent 100%)`,
        transition: 'background 0.8s ease-in-out'
      }}
    />
  );
}

export function ScrollGlowEffect() {
  const { scrollY } = useScroll();
  
  const glowY = useSpring(useTransform(scrollY, [0, 2000], [0, 1000]), {
    stiffness: 100,
    damping: 30
  });
  
  const glowOpacity = useSpring(useTransform(scrollY, [0, 500, 1000, 1500, 2000], [0.3, 0.5, 0.3, 0.5, 0.3]), {
    stiffness: 100,
    damping: 30
  });

  const glowColor = useTransform(scrollY, [0, 500, 1000, 1500, 2000], [
    'rgba(6, 182, 212, 0.5)',
    'rgba(168, 85, 247, 0.5)',
    'rgba(236, 72, 153, 0.5)',
    'rgba(16, 185, 129, 0.5)',
    'rgba(6, 182, 212, 0.5)'
  ]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(150px)',
          zIndex: -1,
          x: 'calc(50% - 300px)',
          y: glowY,
          opacity: glowOpacity,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(100px)',
          zIndex: -1,
          x: '20%',
          y: useSpring(useTransform(scrollY, [0, 2000], [200, 1200]), { stiffness: 100, damping: 30 }),
          opacity: glowOpacity,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(120px)',
          zIndex: -1,
          x: '70%',
          y: useSpring(useTransform(scrollY, [0, 2000], [400, 1400]), { stiffness: 100, damping: 30 }),
          opacity: glowOpacity,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
