import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <motion.div
        style={{
          scaleX,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-primary), var(--accent-secondary))',
          transformOrigin: 'left',
          boxShadow: '0 0 10px var(--accent-cyan)'
        }}
      />
    </div>
  );
}

export function CircularProgress() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const springRotate = useSpring(rotate, {
    stiffness: 100,
    damping: 30
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <svg
        style={{
          transform: 'rotate(-90deg)',
          width: '100%',
          height: '100%'
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="22"
          stroke="rgba(6, 182, 212, 0.1)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="25"
          cy="25"
          r="22"
          stroke="var(--accent-cyan)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="138.23"
          strokeDashoffset={useTransform(scrollYProgress, [0, 1], [138.23, 0])}
          style={{
            filter: 'drop-shadow(0 0 6px var(--accent-cyan))'
          }}
        />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent-cyan)',
          fontWeight: '600'
        }}
      >
        {Math.round(useTransform(scrollYProgress, [0, 1], [0, 100]).get())}%
      </motion.div>
    </motion.div>
  );
}

export function SectionIndicator() {
  const sections = ['home', 'about', 'projects', 'experience', 'contact'];
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => 
        document.getElementById(id)
      );
      
      sectionElements.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      {sections.map((_, index) => (
        <motion.a
          key={index}
          href={`#${sections[index]}`}
          style={{
            width: '3px',
            height: activeSection === index ? '30px' : '12px',
            background: activeSection === index 
              ? 'var(--accent-cyan)' 
              : 'rgba(6, 182, 212, 0.3)',
            borderRadius: '9999px',
            transition: 'all 0.3s ease',
            boxShadow: activeSection === index 
              ? '0 0 10px var(--accent-cyan)' 
              : 'none'
          }}
          whileHover={{
            height: '30px',
            background: 'var(--accent-cyan)',
            boxShadow: '0 0 10px var(--accent-cyan)'
          }}
        />
      ))}
    </div>
  );
}
