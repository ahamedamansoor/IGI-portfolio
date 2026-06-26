import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JarvisBootSequence({ onComplete }) {
  const [bootStage, setBootStage] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('OFFLINE');

  const bootMessages = [
    'INITIALIZING J.A.R.V.I.S. PROTOCOL V4.2...',
    'ESTABLISHING NEURAL LINK...',
    'LOADING COGNITIVE MODULES...',
    'CALIBRATING QUANTUM PROCESSORS...',
    'ESTABLISHING SECURE ENCRYPTION...',
    'LOADING USER PROFILE: AHAMED MANSOOR A...',
    'ACCESSING TECHNICAL DATABASE...',
    'SYNCHRONIZING PORTFOLIO COMPONENTS...',
    'INITIALIZING ANIMATION SYSTEMS...',
    'CALIBRATING HOLOGRAPHIC DISPLAY...',
    'SYSTEM CHECK: ALL GREEN',
    'READY TO INITIATE'
  ];

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let stageTimeout;

    const typeWriter = () => {
      if (textIndex < bootMessages.length) {
        if (charIndex < bootMessages[textIndex].length) {
          setCurrentText(prev => prev + bootMessages[textIndex][charIndex]);
          charIndex++;
          stageTimeout = setTimeout(typeWriter, 25);
        } else {
          setBootStage(textIndex + 1);
          setProgress(((textIndex + 1) / bootMessages.length) * 100);
          
          // Update system status based on stage
          if (textIndex === 0) setSystemStatus('CONNECTING');
          if (textIndex === 3) setSystemStatus('LOADING');
          if (textIndex === 7) setSystemStatus('SYNCHRONIZING');
          if (textIndex === 10) setSystemStatus('ONLINE');
          
          textIndex++;
          charIndex = 0;
          setCurrentText('');
          stageTimeout = setTimeout(typeWriter, 300);
        }
      } else {
        // Boot complete
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    stageTimeout = setTimeout(typeWriter, 300);

    return () => clearTimeout(stageTimeout);
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Central HUD Element */}
      <motion.div
        style={{
          position: 'relative',
          width: '400px',
          height: '400px',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* Outer Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '3px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '50%',
            borderTopColor: '#06b6d4',
            borderRightColor: '#06b6d4',
          }}
        />
        {/* Middle Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            border: '2px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '50%',
            borderBottomColor: '#a855f7',
            borderLeftColor: '#a855f7',
          }}
        />
        {/* Inner Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '80px',
            border: '2px solid rgba(236, 72, 153, 0.4)',
            borderRadius: '50%',
            borderTopColor: '#ec4899',
            borderBottomColor: '#ec4899',
          }}
        />
        {/* Core Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '120px',
            border: '3px solid rgba(6, 182, 212, 0.6)',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* Center Logo */}
      <motion.div
        style={{
          position: 'absolute',
          fontSize: '4rem',
          fontWeight: '700',
          color: '#06b6d4',
          textShadow: '0 0 50px rgba(6, 182, 212, 1)',
          letterSpacing: '0.8rem',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1],
          textShadow: [
            '0 0 50px rgba(6, 182, 212, 1)',
            '0 0 80px rgba(6, 182, 212, 1.2)',
            '0 0 50px rgba(6, 182, 212, 1)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        JARVIS
      </motion.div>

      {/* System Status */}
      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.9rem',
          color: systemStatus === 'ONLINE' ? '#10b981' : '#06b6d4',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.2rem',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          textShadow: systemStatus === 'ONLINE' 
            ? '0 0 20px rgba(16, 185, 129, 0.8)'
            : '0 0 20px rgba(6, 182, 212, 0.8)'
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        STATUS: {systemStatus}
      </motion.div>

      {/* Current Boot Message */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1rem',
          color: '#06b6d4',
          textAlign: 'center',
          minWidth: '500px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15rem',
              textShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
            }}
          >
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ marginLeft: '8px', color: '#a855f7' }}
            >
              ▊
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '6px',
          background: 'rgba(6, 182, 212, 0.2)',
          borderRadius: '3px',
          overflow: 'hidden',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
            backgroundSize: '300% 100%',
            width: `${progress}%`,
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
          }}
          animate={{
            width: `${progress}%`,
            backgroundPosition: ['0% 50%', '100% 50%']
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Percentage Display */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '16%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1rem',
          color: '#06b6d4',
          fontFamily: 'var(--font-mono)',
          fontWeight: '700',
          letterSpacing: '0.2rem',
        }}
        animate={{
          textShadow: '0 0 15px rgba(6, 182, 212, 0.8)'
        }}
      >
        {Math.round(progress)}%
      </motion.div>

      {/* Corner Decorations */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            border: '2px solid rgba(6, 182, 212, 0.4)',
            ...(i === 0 ? { top: '40px', left: '40px', borderRight: 'none', borderBottom: 'none' } : {}),
            ...(i === 1 ? { top: '40px', right: '40px', borderLeft: 'none', borderBottom: 'none' } : {}),
            ...(i === 2 ? { bottom: '40px', left: '40px', borderRight: 'none', borderTop: 'none' } : {}),
            ...(i === 3 ? { bottom: '40px', right: '40px', borderLeft: 'none', borderTop: 'none' } : {}),
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Scanning Lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
          }}
          animate={{
            y: [-50, window.innerHeight + 50],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'linear'
          }}
        />
      ))}

      {/* Data Lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.2), transparent)',
          }}
          animate={{
            x: [-50, window.innerWidth + 50],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear'
          }}
        />
      ))}

      {/* Binary Code Rain */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.15,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${i * 5}%`,
              top: '-100%',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#06b6d4',
              whiteSpace: 'nowrap',
            }}
            animate={{
              y: [0, window.innerHeight + 200],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'linear'
            }}
          >
            {Array(50).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
