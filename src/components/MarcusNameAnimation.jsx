import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function MarcusNameAnimation({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [glitchCharsState, setGlitchCharsState] = useState({});
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Character sets from different languages for glitch effect
  const glitchChars = {
    english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    russian: 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
    chinese: '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改张象完却究支群市音严华计',
    japanese: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    arabic: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
  };

  // Helper function to get random character from different languages
  const getRandomChar = () => {
    const languages = Object.keys(glitchChars);
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const chars = glitchChars[randomLang];
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Randomly morph individual characters to different languages
  useEffect(() => {
    const text = '[CLASSIFIED - PERSONNEL RECORD]';
    const interval = setInterval(() => {
      setGlitchCharsState((prev) => {
        const newState = { ...prev };
        // Randomly select a few characters to morph
        const numCharsToMorph = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numCharsToMorph; i++) {
          const randomIndex = Math.floor(Math.random() * text.length);
          if (text[randomIndex] !== ' ' && text[randomIndex] !== '[' && text[randomIndex] !== ']' && text[randomIndex] !== '-') {
            newState[randomIndex] = getRandomChar();
          }
        }
        return newState;
      });
    }, 500);

    // Clear glitched characters periodically
    const clearGlitchInterval = setInterval(() => {
      setGlitchCharsState({});
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(clearGlitchInterval);
    };
  }, []);

  useEffect(() => {
    const sequence = async () => {
      // Initial military-style scan line
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowText(true);
      
      // Glitch effect sequence
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScanComplete(true);
      
      await controls.start({
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });

      // Removed auto-proceed - now only proceeds on key press
    };

    sequence();
  }, [controls]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.98)',
        zIndex: 10000,
        overflow: 'hidden',
      }}
    >
      {/* Military Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Scan Line Effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
          boxShadow: '0 0 20px var(--accent-cyan)',
        }}
        animate={{
          y: ['-10%', '110%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Military Corner Brackets */}
      {[...Array(4)].map((_, i) => {
        const classes = [
          'corner-bracket corner-bracket-tl',
          'corner-bracket corner-bracket-tr',
          'corner-bracket corner-bracket-bl',
          'corner-bracket corner-bracket-br',
        ];
        return (
          <motion.div
            key={i}
            className={classes[i]}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={controls}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        {/* Military Classification */}
        <motion.div
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'rgba(74, 222, 128, 0.8)',
            marginBottom: '20px',
            letterSpacing: '0.2em',
            display: 'flex',
            gap: '1px',
            justifyContent: 'center',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {'[CLASSIFIED - PERSONNEL RECORD]'.split('').map((char, index) => (
            <motion.span
              key={index}
              animate={{
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 0.2 + Math.random() * 0.2,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 3,
                delay: index * 0.05,
              }}
            >
              {glitchCharsState[index] || char}
            </motion.span>
          ))}
        </motion.div>

        {/* Name with Glitch Effect */}
        <motion.div
          style={{
            position: 'relative',
          }}
          animate={{
            x: [0, -2, 2, -1, 1, 0],
          }}
          transition={{
            duration: 0.05,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        >
          {/* Glitch Layers */}
          <>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-4px',
                color: 'rgba(255, 0, 0, 0.8)',
                fontSize: '48px',
                fontWeight: '700',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                textShadow: '2px 0 rgba(74, 222, 128, 0.5)',
                opacity: 0,
                pointerEvents: 'none',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                x: [-4, 4, -4],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              AHAMED MANSOOR
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '4px',
                color: 'rgba(0, 255, 255, 0.8)',
                fontSize: '48px',
                fontWeight: '700',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                textShadow: '-2px 0 rgba(34, 197, 94, 0.5)',
                opacity: 0,
                pointerEvents: 'none',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                x: [4, -4, 4],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.05,
              }}
            >
              AHAMED MANSOOR
            </motion.div>
          </>

          {/* Main Name */}
          <motion.div
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textShadow: '0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3)',
              position: 'relative',
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(74, 222, 128, 0.5)',
                '0 0 40px rgba(74, 222, 128, 0.8)',
                '0 0 20px rgba(74, 222, 128, 0.5)'
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            AHAMED MANSOOR
          </motion.div>
        </motion.div>

        {/* Military Designation */}
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              marginTop: '30px',
            }}
          >
            <motion.div
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: 'var(--accent-primary)',
                marginBottom: '10px',
                letterSpacing: '0.15em',
              }}
              animate={{
                textShadow: ['0 0 5px rgba(34, 197, 94, 0.3)', '0 0 15px rgba(34, 197, 94, 0.6)', '0 0 5px rgba(34, 197, 94, 0.3)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              SENIOR SOFTWARE ENGINEER
            </motion.div>
            <motion.div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--accent-secondary)',
                letterSpacing: '0.1em',
              }}
              animate={{
                textShadow: ['0 0 5px rgba(236, 72, 153, 0.3)', '0 0 15px rgba(236, 72, 153, 0.6)', '0 0 5px rgba(236, 72, 153, 0.3)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            >
              FRONTEND SPECIALIST
            </motion.div>
          </motion.div>
        )}

        {/* Tech Decorations */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '60px',
                height: '2px',
                background: 'var(--accent-cyan)',
              }}
              animate={{
                width: [60, 80, 60],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Binary Code */}
        <motion.div
          style={{
            marginTop: '30px',
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(74, 222, 128, 0.4)',
            letterSpacing: '0.2em',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          01001001 01000111 01001001
        </motion.div>

        {/* Continue Prompt */}
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{
              marginTop: '50px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(74, 222, 128, 0.6)',
              letterSpacing: '0.15em',
            }}
          >
            [PRESS ANY KEY TO CONTINUE]
          </motion.div>
        )}
      </motion.div>

      {/* Radar Effect */}
      <motion.div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(74, 222, 128, 0.1)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(74, 222, 128, 0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  );
}
