import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"]
  });

  const springConfig = { stiffness: 80, damping: 25 };
  
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.9, 1]), springConfig);

  let transform;
  if (direction === 'up') {
    transform = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), springConfig);
  } else if (direction === 'down') {
    transform = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 0]), springConfig);
  } else if (direction === 'left') {
    transform = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), springConfig);
  } else if (direction === 'right') {
    transform = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 0]), springConfig);
  }

  const style = {
    opacity,
    scale,
    ...(direction === 'left' || direction === 'right' ? { x: transform } : { y: transform })
  };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollParallax({ children, speed = 0.5, className = '', axis = 'y' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, speed * 80]), {
    stiffness: 60,
    damping: 25
  });

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, speed * 30]), {
    stiffness: 60,
    damping: 25
  });

  return (
    <motion.div ref={ref} style={{ y: axis === 'y' ? y : 0, x: axis === 'x' ? x : 0 }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollScale({ children, scaleRange = [0.85, 1], className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [...scaleRange, ...scaleRange.reverse()]), {
    stiffness: 60,
    damping: 25
  });

  return (
    <motion.div ref={ref} style={{ scale }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollRotate({ children, rotateRange = [-3, 3], className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [...rotateRange, ...rotateRange.reverse()]), {
    stiffness: 60,
    damping: 25
  });

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollFade({ children, fadeRange = [0, 1], className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [...fadeRange, ...fadeRange.reverse()]), {
    stiffness: 60,
    damping: 25
  });

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
}
