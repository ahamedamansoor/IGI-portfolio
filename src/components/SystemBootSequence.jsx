import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemBootSequence({ onComplete }) {
  const [bootStage, setBootStage] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const terminalRef = useRef(null);

  const bootMessages = [
    '[MARCUS PROTOCOL] INITIALIZING MILITARY GRADE SECURITY...',
    '[MARCUS PROTOCOL] ESTABLISHING SECURE COMMS LINK...',
    '[MARCUS PROTOCOL] AUTHENTICATING AGENT: AHAMED MANSOOR...',
    '[MARCUS PROTOCOL] VERIFYING CLEARANCE LEVEL...',
    '[MARCUS PROTOCOL] LOADING TACTICAL MODULES...',
    '[MARCUS PROTOCOL] CALIBRATING SYSTEMS...',
    '[MARCUS PROTOCOL] SYNCHRONIZING DATABASE...',
    '[MARCUS PROTOCOL] INITIALIZING INTERFACE...',
    '[MARCUS PROTOCOL] CLEARANCE CONFIRMED',
    '[MARCUS PROTOCOL] MISSION READY'
  ];

  const terminalCommands = [
    '> marcus --init --military-grade',
    '> marcus --secure-link --agent=mansoor',
    '> marcus --authenticate --clearance=alpha',
    '> marcus --verify --biometric',
    '> marcus --load-tactical-modules',
    '> marcus --calibrate-systems',
    '> marcus --sync-database --secure',
    '> marcus --init-interface',
    '> marcus --confirm-clearance',
    '> marcus --mission-ready'
  ];

  const terminalOutputs = [
    '[MARCUS] Military grade security active',
    '[MARCUS] Secure comms link established',
    '[MARCUS] Agent authenticated: AHAMED MANSOOR',
    '[MARCUS] Clearance level: ALPHA',
    '[MARCUS] Tactical modules loaded (15/15)',
    '[MARCUS] Systems calibrated',
    '[MARCUS] Database synchronized',
    '[MARCUS] Interface initialized',
    '[MARCUS] Clearance confirmed',
    '[MARCUS] MISSION READY - AGENT AHAMED MANSOOR'
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
          stageTimeout = setTimeout(typeWriter, 15);
        } else {
          setBootStage(textIndex + 1);
          setProgress(((textIndex + 1) / bootMessages.length) * 100);
          
          setTerminalHistory(prev => [
            ...prev,
            { command: terminalCommands[textIndex], output: terminalOutputs[textIndex] }
          ]);
          
          textIndex++;
          charIndex = 0;
          setCurrentText('');
          stageTimeout = setTimeout(typeWriter, 400);
        }
      } else {
        console.log('Boot sequence complete, calling onComplete');
        if (onComplete) {
          onComplete();
        } else {
          console.warn('onComplete callback is not provided');
        }
      }
    };

    stageTimeout = setTimeout(typeWriter, 500);

    return () => clearTimeout(stageTimeout);
  }, [onComplete]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory, currentText]);

  return (
    <motion.div
      className="boot-container"
      animate={{
        x: [0, -1, 1, -0.5, 0.5, 0],
      }}
      transition={{
        duration: 0.05,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {/* Military Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74, 222, 128, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74, 222, 128, 0.05) 1px, transparent 1px)
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
        const bracketClasses = ['corner-bracket-tl', 'corner-bracket-tr', 'corner-bracket-bl', 'corner-bracket-br'];
        return (
          <motion.div
            key={i}
            className={`corner-bracket ${bracketClasses[i]}`}
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

      {/* Terminal Window */}
      <motion.div
        className="boot-terminal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: [0, -2, 2, -1, 1, 0],
        }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1],
          x: {
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: 3,
          }
        }}
      >
        {/* Military Classification Header */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid var(--accent-cyan)',
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            textShadow: ['0 0 0 transparent', '0 0 10px rgba(74, 222, 128, 0.8)', '0 0 0 transparent'],
          }}
          transition={{ 
            delay: 0.3,
            textShadow: {
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 2,
            }
          }}
        >
          <motion.div 
            style={{ 
              color: 'var(--accent-cyan)', 
              fontSize: '0.9rem', 
              fontWeight: '700',
              letterSpacing: '0.1em'
            }}
            animate={{
              x: [0, 1, -1, 0],
            }}
            transition={{
              duration: 0.05,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            [MARCUS TERMINAL - CLASSIFIED]
          </motion.div>
          <motion.div 
            style={{ 
              color: 'var(--accent-primary)', 
              fontSize: '0.8rem',
              letterSpacing: '0.05em'
            }}
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          >
            [{new Date().toLocaleTimeString()}]
          </motion.div>
        </motion.div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="boot-terminal-content"
        >
          {/* Terminal History */}
          {terminalHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                x: [0, 1, -1, 0],
              }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1,
                x: {
                  duration: 0.05,
                  repeat: Infinity,
                  repeatDelay: 2 + index * 0.3,
                }
              }}
              style={{ marginBottom: '8px' }}
            >
              <motion.div 
                style={{ 
                  color: 'var(--accent-primary)', 
                  opacity: 0.8,
                  fontWeight: '600'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 1.5 + index * 0.2,
                }}
              >
                {item.command}
              </motion.div>
              <motion.div 
                style={{ 
                  color: 'var(--accent-cyan)', 
                  marginLeft: '10px',
                  fontWeight: '500'
                }}
                animate={{
                  textShadow: ['0 0 0 transparent', '0 0 8px rgba(74, 222, 128, 0.6)', '0 0 0 transparent'],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 2.5 + index * 0.2,
                }}
              >
                {item.output}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Current Typing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x: [0, 1, -1, 0],
              }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: 'monospace',
                textShadow: '0 0 8px rgba(74, 222, 128, 0.5)',
              }}
              transition={{
                x: {
                  duration: 0.05,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }
              }}
            >
              <motion.span 
                style={{ 
                  color: 'var(--accent-primary)', 
                  opacity: 0.8,
                  fontWeight: '600'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              ></motion.span> {currentText}
              <motion.span
                animate={{ 
                  opacity: [1, 0, 1],
                  x: [0, 2, 0],
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity,
                  x: {
                    duration: 0.05,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                  }
                }}
                style={{ 
                  marginLeft: '8px', 
                  color: 'var(--accent-cyan)',
                  fontWeight: '700'
                }}
              >
                █
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="boot-progress-bar"
          style={{ marginTop: '30px' }}
          initial={{ width: 0 }}
          animate={{ 
            width: '100%',
            borderColor: ['var(--accent-cyan)', 'var(--accent-primary)', 'var(--accent-cyan)'],
          }}
          transition={{ 
            duration: 5,
            ease: 'linear',
            borderColor: {
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 1.5,
            }
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-primary), var(--accent-secondary))',
              width: '100%',
              boxShadow: '0 0 15px rgba(74, 222, 128, 0.6)',
            }}
            initial={{ width: '0%' }}
            animate={{
              width: '100%',
              opacity: [1, 0.8, 1],
            }}
            transition={{ 
              duration: 5,
              ease: 'linear',
              opacity: {
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 0.8,
              }
            }}
          />
        </motion.div>

        {/* Percentage */}
        <motion.div
          style={{
            marginTop: '15px',
            color: 'var(--accent-cyan)',
            fontSize: '0.9rem',
            textAlign: 'right',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            fontWeight: '600'
          }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            x: [0, 1, -1, 0],
            textShadow: ['0 0 0 transparent', '0 0 10px rgba(74, 222, 128, 0.8)', '0 0 0 transparent'],
          }}
          transition={{ 
            x: {
              duration: 0.05,
              repeat: Infinity,
              repeatDelay: 1.2,
            },
            textShadow: {
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 2,
            }
          }}
        >
          [LOADING...]
        </motion.div>
      </motion.div>

      {/* Radar Effect */}
      <motion.div
        className="boot-radar"
        style={{ width: '400px', height: '400px' }}
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
        className="boot-radar"
        style={{ width: '300px', height: '300px' }}
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

      {/* Binary Code */}
      <motion.div
        className="boot-binary"
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
    </motion.div>
  );
}
