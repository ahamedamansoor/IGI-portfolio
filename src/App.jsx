import FuturisticBackground from './components/FuturisticBackground';
import ParticleBackground from './components/ParticleBackground';
import JarvisBackground from './components/JarvisBackground';
import SystemBootSequence from './components/SystemBootSequence';
import MarcusNameAnimation from './components/MarcusNameAnimation';
import MarcusNavigation from './components/MarcusNavigation';
import About from './components/About';
import CustomCursor from './components/CustomCursor';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import './styles/components.css';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [nameAnimationComplete, setNameAnimationComplete] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [glitchCharsState, setGlitchCharsState] = useState({});
  const [expandedExperience, setExpandedExperience] = useState({});
  const [expandedProject, setExpandedProject] = useState({ coderpod: true });
  const audioRef = useRef(null);

  // Experience data
  const experiences = [
    {
      id: 1,
      title: 'Senior Software Engineer - Frontend',
      company: 'Cisco Systems India Pvt. Ltd.',
      location: 'Bengaluru',
      date: 'July 2021– Present',
      status: 'CURRENT',
      project: 'Crosswork Network Controller - Enterprise network analysis and management platform',
      promotion: 'Promoted from G6 to G8 in 2023',
      achievements: [
        'Led development of 31 reusable Angular components adopted organization-wide, establishing component library standards',
        'Delivered 46% performance improvement, reducing login/page load times from 12s to 6.5s through code optimization',
        'Optimized device CSV export for 25,000 devices, reducing processing time by 89% (75s to 8s)',
        'Spearheaded Angular upgrades from version 8 to 19, maintaining alignment with framework releases',
        'Integrated SonarQube with Jenkins pipeline, enforcing 75% code coverage and 100% test pass rate for PR approvals',
        'Introduced Playwright for visual regression testing and Mermaid for workflow documentation',
        'Conducted multiple POCs on AI integration and agentic AI workflows to enhance application capabilities',
        'Led India team for efficient CNC deliveries and bug fixes across IST timezone',
        'Collaborated with cross-functional stakeholders to align technical specifications with project goals'
      ],
      technologies: 'Angular 8-21, TypeScript, RxJS, React, Next.js, JavaScript ES6, HTML5, CSS3, SASS, Bootstrap, Jasmine, Playwright, Jenkins, SonarQube, D3.js, SVG, Canvas, Claude, GitHub Copilot, Windsurf'
    },
    {
      id: 2,
      title: 'Software Developer - Frontend',
      company: 'Infrrd.ai',
      location: 'Bengaluru',
      date: 'January 2020– May 2021',
      status: 'PREVIOUS',
      project: 'Home Genius - Virtual real estate brokerage platform',
      achievements: [
        'Developed features for property viewing, price comparison, agent communication, and online paperwork handling',
        'Built responsive user interfaces enabling seamless property browsing and visit scheduling',
        'Implemented real-time chat functionality and integrated local amenity discovery features'
      ],
      technologies: 'Angular 8, React, HTML5, CSS3, SASS, JavaScript ES6, RxJS, Azure, Bootstrap, Jasmine'
    },
    {
      id: 3,
      title: 'Education',
      company: 'M. Kumarasamy College of Engineering',
      location: 'Karur',
      date: '2013– 2017',
      status: 'EDUCATION',
      project: 'Bachelor of Engineering in Electrical and Electronic Engineering',
      achievements: [
        'CGPA: 8.1/10'
      ],
      technologies: ''
    }
  ];

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

  const handleMissionSelect = (mission) => {
    setSelectedMission(mission);
  };

  // Start audio on first user interaction
  const startAudio = () => {
    if (!audioStarted) {
      const audio = new Audio('/20. (Ingame) Campaign 3 - Level 2.mp3');
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().then(() => {
        console.log('Audio playing successfully');
        setAudioStarted(true);
        audioRef.current = audio;
      }).catch(e => {
        console.log('Audio play failed:', e);
      });
    }
  };

  // Toggle audio pause/play
  const toggleAudio = () => {
    if (!audioStarted) {
      startAudio();
    } else if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  // Auto-complete boot after 10 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!bootComplete && nameAnimationComplete) {
        console.log('Boot fallback timeout - forcing boot complete');
        setBootComplete(true);
      }
    }, 10000);
    return () => clearTimeout(fallbackTimer);
  }, [bootComplete, nameAnimationComplete]);

  // Randomly morph individual characters to different languages
  useEffect(() => {
    if (bootComplete) {
      const text = '[MARCUS SYSTEM - ONLINE]';
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
      const clearInterval = setInterval(() => {
        setGlitchCharsState({});
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(clearInterval);
      };
    }
  }, [bootComplete]);

  // Start audio on first user interaction (click anywhere)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioStarted) {
        startAudio();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [audioStarted]);

  return (
    <>
      <CustomCursor />
      
      {/* Music Toggle Button */}
      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          top: '60px',
          right: '60px',
          zIndex: 99999,
          background: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid #4ade80',
          color: '#4ade80',
          padding: '10px 15px',
          fontFamily: 'monospace',
          fontSize: '12px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#4ade80';
          e.target.style.color = 'black';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.8)';
          e.target.style.color = '#4ade80';
        }}
      >
        {!audioStarted || audioRef?.current?.paused ? '▶ MUSIC ON' : '■ MUSIC OFF'}
      </button>
      
      <AnimatePresence mode="wait">
        {/* Marcus Name Animation */}
        {!nameAnimationComplete && (
          <motion.div
            key="name-animation"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: 'blur(10px)',
              x: [0, -10, 10, -5, 5, 0],
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              x: {
                duration: 0.05,
                repeat: 5,
              }
            }}
            onClick={() => setNameAnimationComplete(true)}
            onKeyDown={() => setNameAnimationComplete(true)}
            tabIndex={0}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <MarcusNameAnimation />
          </motion.div>
        )}

        {/* System Boot Sequence */}
        {nameAnimationComplete && !bootComplete && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: 'blur(10px)',
              x: [0, -10, 10, -5, 5, 0],
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              x: {
                duration: 0.05,
                repeat: 5,
              }
            }}
          >
            <SystemBootSequence onComplete={() => setBootComplete(true)} />
          </motion.div>
        )}
        
        {/* Main Content - Only show after boot sequence */}
        {bootComplete && (
          <>
            <motion.div
              key="main"
              initial={{ 
                opacity: 0,
                scale: 0.95,
                filter: 'blur(5px)',
                y: 20,
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                y: 0,
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                width: '100%',
                height: '100vh',
                display: selectedMission && selectedMission.name === 'ABOUT' ? 'flex' : 'flex',
                alignItems: selectedMission && selectedMission.name === 'ABOUT' ? 'center' : 'center',
                justifyContent: selectedMission && selectedMission.name === 'ABOUT' ? 'center' : 'center',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 20, 0, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)',
                overflow: 'hidden',
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
                background: 'linear-gradient(90deg, transparent, #4ade80, transparent)',
                boxShadow: '0 0 20px #4ade80',
                pointerEvents: 'none',
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
              const positions = [
                { top: '20px', left: '20px', borderTop: '3px solid #4ade80', borderLeft: '3px solid #4ade80' },
                { top: '20px', right: '20px', borderTop: '3px solid #4ade80', borderRight: '3px solid #4ade80' },
                { bottom: '20px', left: '20px', borderBottom: '3px solid #4ade80', borderLeft: '3px solid #4ade80' },
                { bottom: '20px', right: '20px', borderBottom: '3px solid #4ade80', borderRight: '3px solid #4ade80' },
              ];
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    ...positions[i],
                    opacity: 0.8,
                    pointerEvents: 'none',
                  }}
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

            {/* Binary Code */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '40px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'rgba(74, 222, 128, 0.4)',
                letterSpacing: '0.2em',
                pointerEvents: 'none',
                zIndex: 1,
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

            {/* Military Corner Brackets */}
            {[...Array(4)].map((_, i) => {
              const positions = [
                { top: '20px', left: '20px', borderTop: '3px solid #4ade80', borderLeft: '3px solid #4ade80' },
                { top: '20px', right: '20px', borderTop: '3px solid #4ade80', borderRight: '3px solid #4ade80' },
                { bottom: '20px', left: '20px', borderBottom: '3px solid #4ade80', borderLeft: '3px solid #4ade80' },
                { bottom: '20px', right: '20px', borderBottom: '3px solid #4ade80', borderRight: '3px solid #4ade80' },
              ];
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    ...positions[i],
                    opacity: 0.8,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
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

            {/* Radar Effect */}
            <motion.div
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                border: '1px solid rgba(74, 222, 128, 0.1)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
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
                zIndex: 0,
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

            {/* Main Content - Scrollable */}
            <motion.div
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedMission && selectedMission.name === 'ABOUT' ? (
                <About />
              ) : selectedMission && selectedMission.name === 'EXPERTISE' ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                  }}
                  transition={{
                    scaleY: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2 },
                    x: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                    y: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                  }}
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  <div style={{
                    padding: '40px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid #4ade80',
                    borderRadius: 0,
                    maxWidth: '900px',
                    margin: '20px auto',
                    boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#4ade80',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    marginBottom: '20px',
                    fontWeight: '700',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #4ade80',
                  }}>
                    [EXPERTISE] - OPERATIONAL CAPABILITIES
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '10px',
                  }}>
                    {['HTML5', 'CSS3', 'SASS', 'JavaScript ES6', 'TypeScript', 'Angular 8-19', 'React', 'Next.js', 'RxJS', 'Bootstrap', 'D3.js', 'AG-Grid', 'SVG', 'Canvas', 'Node.js', 'Go Lang', 'REST API', 'Jenkins', 'SonarQube', 'Playwright', 'Jasmine', 'Git', 'Azure', 'Webpack', 'Figma', 'Pixel Perfect Pro'].map((skill, skillIndex) => {
                      const skillPercentages = {
                        'HTML5': 95, 'CSS3': 95, 'SASS': 90, 'JavaScript ES6': 95,
                        'TypeScript': 92, 'Angular 8-19': 90, 'React': 95, 'Next.js': 90,
                        'RxJS': 85, 'Bootstrap': 92, 'D3.js': 85, 'AG-Grid': 88,
                        'SVG': 90, 'Canvas': 85, 'Node.js': 88, 'Go Lang': 80,
                        'REST API': 92, 'Jenkins': 85, 'SonarQube': 85, 'Playwright': 88,
                        'Jasmine': 85, 'Git': 95, 'Azure': 85, 'Webpack': 88,
                        'Figma': 90, 'Pixel Perfect Pro': 95
                      };
                      const percentage = skillPercentages[skill] || 90;
                      const level = percentage >= 95 ? 'EXPERT' : percentage >= 85 ? 'ADVANCED' : 'INTERMEDIATE';

                      return (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.03, duration: 0.3 }}
                          style={{
                            padding: '10px 12px',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(74, 222, 128, 0.3)',
                            borderRadius: 0,
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '4px',
                            height: '100%',
                            background: percentage >= 95 ? '#4ade80' : percentage >= 90 ? '#22c55e' : '#16a34a',
                          }} />
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#ffffff',
                            fontWeight: '600',
                            marginBottom: '6px',
                            fontFamily: 'monospace',
                            paddingLeft: '6px',
                          }}>
                            {skill}
                          </div>
                          <div style={{
                            width: '100%',
                            height: '3px',
                            background: 'rgba(74, 222, 128, 0.2)',
                            borderRadius: 0,
                            overflow: 'hidden',
                            marginBottom: '6px',
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: skillIndex * 0.05 + 0.2, duration: 0.4 }}
                              style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                                borderRadius: 0,
                              }}
                            />
                          </div>
                          <div style={{
                            display: 'inline-block',
                            fontSize: '0.6rem',
                            color: '#4ade80',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            letterSpacing: '0.1em',
                            paddingLeft: '6px',
                            opacity: 0.9,
                          }}>
                            {level}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                </motion.div>
              ) : selectedMission && selectedMission.name === 'EXPERIENCE' ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                  }}
                  transition={{
                    scaleY: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2 },
                    x: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                    y: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                  }}
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  <div style={{
                    padding: '40px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid #4ade80',
                    borderRadius: 0,
                    maxWidth: '900px',
                    width: '100%',
                    minWidth: '900px',
                    margin: '20px auto',
                    boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#4ade80',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      marginBottom: '30px',
                      fontWeight: '700',
                      paddingBottom: '10px',
                      borderBottom: '2px solid #4ade80',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span>[EXPERIENCE] - MISSION HISTORY</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          fontSize: '0.8rem',
                          color: '#22c55e',
                        }}
                      >
                        ● ACTIVE
                      </motion.span>
                    </h3>

                    <div style={{
                      maxHeight: '70vh',
                      overflowY: 'auto',
                      paddingRight: '10px',
                      width: '100%',
                      minWidth: '100%',
                    }}>
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          style={{
                            background: 'rgba(74, 222, 128, 0.05)',
                            border: '1px solid rgba(74, 222, 128, 0.3)',
                            borderRadius: 0,
                            padding: '25px',
                            marginBottom: '20px',
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100%',
                            minWidth: '100%',
                          }}
                        >
                          <motion.div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '4px',
                              height: '100%',
                              background: 'linear-gradient(180deg, #4ade80, #22c55e, #16a34a)',
                            }}
                          />
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '15px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setExpandedExperience(prev => ({ ...prev, [exp.id]: !prev[exp.id] }))}
                        >
                            <h4 style={{
                              fontSize: '1.2rem',
                              color: '#ffffff',
                              fontFamily: 'monospace',
                              fontWeight: '700',
                              margin: 0,
                              lineHeight: '1.3',
                            }}>
                              {exp.title}
                            </h4>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <div style={{
                                fontSize: '0.8rem',
                                color: '#4ade80',
                                fontFamily: 'monospace',
                                background: 'rgba(74, 222, 128, 0.2)',
                                padding: '4px 8px',
                                borderRadius: 0,
                                flexShrink: 0,
                                fontWeight: '600',
                              }}>
                                {exp.status}
                              </div>
                              <motion.div
                                animate={{ rotate: expandedExperience[exp.id] ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  fontSize: '1rem',
                                  color: '#4ade80',
                                  fontWeight: '700',
                                }}
                              >
                                ▼
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedExperience[exp.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div style={{
                                  fontSize: '1rem',
                                  color: '#c0c0c0',
                                  fontFamily: 'monospace',
                                  marginBottom: '8px',
                                  fontWeight: '600',
                                }}>
                                  {exp.company}
                                </div>
                                <div style={{
                                  fontSize: '0.9rem',
                                  color: '#888',
                                  fontFamily: 'monospace',
                                  marginBottom: '15px',
                                }}>
                                  {exp.location && `${exp.location} | `}{exp.date}
                                </div>
                                {exp.promotion && (
                                  <div style={{
                                    fontSize: '0.85rem',
                                    color: '#22c55e',
                                    fontFamily: 'monospace',
                                    marginBottom: '15px',
                                    fontWeight: '600',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    padding: '8px 12px',
                                    borderLeft: '3px solid #22c55e',
                                  }}>
                                    ► {exp.promotion}
                                  </div>
                                )}
                                {exp.project && (
                                  <div style={{
                                    fontSize: '0.95rem',
                                    color: '#4ade80',
                                    fontFamily: 'monospace',
                                    marginBottom: '15px',
                                    fontWeight: '600',
                                  }}>
                                    PROJECT: {exp.project}
                                  </div>
                                )}
                                <div style={{
                                  fontSize: '0.9rem',
                                  color: '#c0c0c0',
                                  fontFamily: 'monospace',
                                  marginBottom: '15px',
                                  lineHeight: '1.6',
                                }}>
                                  <div style={{
                                    fontSize: '0.85rem',
                                    color: '#4ade80',
                                    fontFamily: 'monospace',
                                    marginBottom: '10px',
                                    fontWeight: '600',
                                  }}>
                                    ► KEY ACHIEVEMENTS:
                                  </div>
                                  <ul style={{
                                    margin: 0,
                                    paddingLeft: '20px',
                                    color: '#c0c0c0',
                                  }}>
                                    {exp.achievements.map((achievement, i) => (
                                      <li key={i} style={{
                                        marginBottom: '6px',
                                        lineHeight: '1.5',
                                      }}>
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {exp.technologies && (
                                  <div style={{
                                    fontSize: '0.85rem',
                                    color: '#888',
                                    fontFamily: 'monospace',
                                    marginTop: '10px',
                                  }}>
                                    <span style={{ color: '#4ade80', fontWeight: '600' }}>TECHNOLOGIES:</span> {exp.technologies}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : selectedMission && selectedMission.name === 'PROJECTS' ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                  }}
                  transition={{
                    scaleY: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2 },
                    x: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                    y: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                  }}
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  <div style={{
                    padding: '40px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid #4ade80',
                    borderRadius: 0,
                    width: '900px',
                    margin: '20px auto',
                    boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#4ade80',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      marginBottom: '30px',
                      fontWeight: '700',
                      paddingBottom: '10px',
                      borderBottom: '2px solid #4ade80',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span>[PROJECTS] - MISSION PROTOCOLS</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          fontSize: '0.8rem',
                          color: '#22c55e',
                        }}
                      >
                        ● LIVE
                      </motion.span>
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{
                        background: 'rgba(74, 222, 128, 0.05)',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        borderRadius: 0,
                        padding: '25px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '4px',
                          height: '100%',
                          background: 'linear-gradient(180deg, #4ade80, #22c55e, #16a34a)',
                        }}
                      />
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '20px',
                        alignItems: 'center',
                      }}>
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setExpandedProject(prev => ({ ...prev, coderpod: !prev.coderpod }))}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                              style={{
                                width: '30px',
                                height: '30px',
                                border: '2px solid #4ade80',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                              }}
                            >
                              ⚡
                            </motion.div>
                            <h4 style={{
                              fontSize: '1.4rem',
                              color: '#ffffff',
                              fontFamily: 'monospace',
                              fontWeight: '600',
                              margin: 0,
                            }}>
                              CoderPod.org
                            </h4>
                            <motion.div
                              animate={{ rotate: expandedProject.coderpod ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                fontSize: '1rem',
                                color: '#4ade80',
                                fontWeight: '700',
                                marginLeft: '10px',
                              }}
                            >
                              ▼
                            </motion.div>
                          </div>

                          <AnimatePresence>
                            {expandedProject.coderpod && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                          <p style={{
                            fontSize: '0.95rem',
                            color: '#b0b0b0',
                            fontFamily: 'monospace',
                            lineHeight: '1.6',
                            marginBottom: '15px',
                          }}>
                            Built full-stack AI-powered coding platform for developers using Next.js and agentic AI tools (Claude, Codex, Windsurf).
                          </p>
                          <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap',
                            marginBottom: '15px',
                          }}>
                            {['Next.js', 'React', 'TypeScript', 'Node.js', 'Claude', 'GitHub Copilot', 'Windsurf', 'SVG', 'Canvas', 'Figma'].map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                                style={{
                                  padding: '4px 10px',
                                  background: 'rgba(74, 222, 128, 0.1)',
                                  border: '1px solid rgba(74, 222, 128, 0.3)',
                                  borderRadius: 0,
                                  fontSize: '0.75rem',
                                  color: '#4ade80',
                                  fontFamily: 'monospace',
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          <a
                            href="https://coderpod.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '15px 25px',
                              background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))',
                              border: '2px solid #4ade80',
                              borderRadius: 0,
                              color: '#4ade80',
                              fontFamily: 'monospace',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#4ade80';
                              e.target.style.color = 'black';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))';
                              e.target.style.color = '#4ade80';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            <span>ACCESS</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                              style={{ fontSize: '16px' }}
                            >
                              →
                            </motion.span>
                          </a>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, transparent, #4ade80, transparent)',
                        }}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      style={{
                        marginTop: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '15px',
                      }}
                    >
                      {[
                        { label: 'STATUS', value: 'ACTIVE', color: '#4ade80' },
                        { label: 'VERSION', value: 'v2.0', color: '#22c55e' },
                        { label: 'UPTIME', value: '99.9%', color: '#16a34a' }
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                          style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(74, 222, 128, 0.2)',
                            borderRadius: 0,
                            padding: '12px',
                            textAlign: 'center',
                          }}
                        >
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#888',
                            fontFamily: 'monospace',
                            marginBottom: '5px',
                          }}>
                            {stat.label}
                          </div>
                          <div style={{
                            fontSize: '1rem',
                            color: stat.color,
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                          }}>
                            {stat.value}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ) : selectedMission && selectedMission.name === 'CONTACT' ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                  }}
                  transition={{
                    scaleY: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2 },
                    x: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                    y: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                  }}
                  style={{
                    transformOrigin: 'center center',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{
                    padding: '40px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid #4ade80',
                    borderRadius: 0,
                    maxWidth: '900px',
                    margin: '20px auto',
                    boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#4ade80',
                      fontFamily: 'monospace',
                      letterSpacing: '0.05em',
                      marginBottom: '30px',
                      fontWeight: '700',
                      paddingBottom: '10px',
                      borderBottom: '2px solid #4ade80',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span>[CONTACT] - SECURE CHANNEL</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          fontSize: '0.8rem',
                          color: '#22c55e',
                        }}
                      >
                        ● ACTIVE
                      </motion.span>
                    </h3>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginBottom: '25px',
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{
                          background: 'rgba(74, 222, 128, 0.03)',
                          border: '1px solid rgba(74, 222, 128, 0.2)',
                          borderRadius: 0,
                          padding: '18px 22px',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{
                          borderColor: '#4ade80',
                          boxShadow: '0 0 20px rgba(74, 222, 128, 0.15)',
                          transform: 'translateX(5px)',
                        }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '3px',
                            height: '100%',
                            background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                          }}
                        />
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                border: '2px solid #4ade80',
                                borderRadius: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                background: 'rgba(74, 222, 128, 0.1)',
                              }}
                            >
                              ✉️
                            </div>
                            <div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#888',
                                fontFamily: 'monospace',
                                fontWeight: '600',
                                marginBottom: '2px',
                              }}>
                                EMAIL ENCRYPTED
                              </div>
                              <a
                                href="mailto:ahamedamansoor.dev@gmail.com"
                                style={{
                                  fontSize: '1rem',
                                  color: '#4ade80',
                                  fontFamily: 'monospace',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = '#22c55e';
                                  e.target.style.letterSpacing = '0.05em';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = '#4ade80';
                                  e.target.style.letterSpacing = '0';
                                }}
                              >
                                ahamedamansoor.dev@gmail.com
                              </a>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{
                              width: '20px',
                              height: '20px',
                              border: '2px solid rgba(74, 222, 128, 0.3)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '8px',
                            }}
                          >
                            ⚡
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{
                          background: 'rgba(74, 222, 128, 0.03)',
                          border: '1px solid rgba(74, 222, 128, 0.2)',
                          borderRadius: 0,
                          padding: '18px 22px',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{
                          borderColor: '#4ade80',
                          boxShadow: '0 0 20px rgba(74, 222, 128, 0.15)',
                          transform: 'translateX(5px)',
                        }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '3px',
                            height: '100%',
                            background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                          }}
                        />
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                border: '2px solid #4ade80',
                                borderRadius: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                background: 'rgba(74, 222, 128, 0.1)',
                              }}
                            >
                              📱
                            </div>
                            <div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#888',
                                fontFamily: 'monospace',
                                fontWeight: '600',
                                marginBottom: '2px',
                              }}>
                                DIRECT LINE
                              </div>
                              <a
                                href="tel:+917010932552"
                                style={{
                                  fontSize: '1rem',
                                  color: '#4ade80',
                                  fontFamily: 'monospace',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = '#22c55e';
                                  e.target.style.letterSpacing = '0.05em';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = '#4ade80';
                                  e.target.style.letterSpacing = '0';
                                }}
                              >
                                +91-7010932552
                              </a>
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#22c55e',
                            fontFamily: 'monospace',
                            fontWeight: '600',
                            background: 'rgba(34, 197, 94, 0.1)',
                            padding: '3px 8px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                          }}>
                            24/7
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                          background: 'rgba(74, 222, 128, 0.03)',
                          border: '1px solid rgba(74, 222, 128, 0.2)',
                          borderRadius: 0,
                          padding: '18px 22px',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        whileHover={{
                          borderColor: '#4ade80',
                          boxShadow: '0 0 20px rgba(74, 222, 128, 0.15)',
                          transform: 'translateX(5px)',
                        }}
                      >
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '3px',
                            height: '100%',
                            background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                          }}
                        />
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                          }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                border: '2px solid #4ade80',
                                borderRadius: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                background: 'rgba(74, 222, 128, 0.1)',
                              }}
                            >
                              📍
                            </div>
                            <div>
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#888',
                                fontFamily: 'monospace',
                                fontWeight: '600',
                                marginBottom: '2px',
                              }}>
                                BASE LOCATION
                              </div>
                              <div style={{
                                fontSize: '1rem',
                                color: '#c0c0c0',
                                fontFamily: 'monospace',
                              }}>
                                Bengaluru, India
                              </div>
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#4ade80',
                            fontFamily: 'monospace',
                            fontWeight: '600',
                          }}>
                                IST (UTC+5:30)
                              </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      style={{
                        background: 'rgba(74, 222, 128, 0.03)',
                        border: '1px solid rgba(74, 222, 128, 0.2)',
                        borderRadius: 0,
                        padding: '22px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '3px',
                          height: '100%',
                          background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                        }}
                      />
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#ffffff',
                        fontFamily: 'monospace',
                        fontWeight: '600',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            border: '2px solid #4ade80',
                            borderRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            background: 'rgba(74, 222, 128, 0.1)',
                          }}
                        >
                          🔗
                        </div>
                        PROFESSIONAL NETWORK
                      </div>
                      <motion.a
                        href="https://linkedin.com/in/ahamedamansoor"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: '#4ade80',
                          boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '15px 25px',
                          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(34, 197, 94, 0.03))',
                          border: '2px solid rgba(74, 222, 128, 0.3)',
                          borderRadius: 0,
                          textDecoration: 'none',
                          color: '#4ade80',
                          fontFamily: 'monospace',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1))';
                          e.target.style.borderColor = '#4ade80';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(34, 197, 94, 0.03))';
                          e.target.style.borderColor = 'rgba(74, 222, 128, 0.3)';
                        }}
                      >
                        <span style={{ fontSize: '2rem' }}>💼</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '0.6rem', color: '#22c55e', letterSpacing: '0.15em', fontWeight: '600' }}>► CONNECT</span>
                          <span style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>LINKEDIN</span>
                        </div>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ fontSize: '1.1rem' }}
                        >
                          →
                          </motion.span>
                        </motion.a>
                      </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(74, 222, 128, 0.2)',
                        borderRadius: 0,
                        padding: '20px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#22c55e',
                        fontFamily: 'monospace',
                        marginBottom: '10px',
                        letterSpacing: '0.1em',
                      }}>
                        ► ENCRYPTION STATUS
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                      }}>
                        SECURE CHANNEL ACTIVE
                      </div>
                      <motion.div
                        style={{
                          marginTop: '15px',
                          height: '4px',
                          background: 'rgba(74, 222, 128, 0.2)',
                          borderRadius: 0,
                          overflow: 'hidden',
                          border: '1px solid #4ade80',
                        }}
                      >
                        <motion.div
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                            width: '100%',
                          }}
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : selectedMission && selectedMission.name === 'RECOGNITION' ? (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                  }}
                  transition={{
                    scaleY: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2 },
                    x: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                    y: {
                      duration: 0.09,
                      repeat: Infinity,
                      repeatDelay: 3.9,
                    },
                  }}
                  style={{
                    transformOrigin: 'center center',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{
                    padding: '30px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid #4ade80',
                    borderRadius: 0,
                    maxWidth: '900px',
                    margin: '20px auto',
                    boxShadow: '0 0 30px rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    maxHeight: '80vh',
                  }}>
                    <div style={{
                      overflowY: 'auto',
                      flex: 1,
                      paddingRight: '10px',
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                        marginBottom: '25px',
                        fontWeight: '700',
                        paddingBottom: '10px',
                        borderBottom: '2px solid #4ade80',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <span>[RECOGNITION] - TESTIMONIALS & ACHIEVEMENTS</span>
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          fontSize: '0.8rem',
                          color: '#22c55e',
                        }}
                      >
                        ● VERIFIED
                      </motion.span>
                    </h3>

                    {/* Testimonials Section */}
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{
                        fontSize: '1rem',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        marginBottom: '15px',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                      }}>
                        ► TESTIMONIALS
                      </div>
                      
                      {[
                        {
                          quote: "Thank you for responding to the AI Challenge and embracing the call to become skilled at the use of AI. By making AI a core part of how you work every day, you're not just raising the bar—you're inspiring those around you to think bigger and push boundaries. Your leadership shines as a true example of what it means to \"Think Really Big\" at Cisco. Cheers, Jeetu",
                          author: "Jeetu Patel",
                          title: "President and Chief Product Officer",
                          company: "Cisco Systems",
                          context: "Think Really Big"
                        },
                        {
                          quote: "Thanks for getting this done Mansoor!! Without your diligence, hard work, and excellent collaboration, we would not have been able to deliver such a rich accessibility and localization functionality. I appreciate all the time you've taken, on top of your committed CNC activities, to deliver this new functionality in tight schedule to ensure the success of the EPNM program. Keep it up! Thanks, Mirel.",
                          author: "Mirel Sprung",
                          title: "Director, Software Engineering",
                          company: "Cisco Systems",
                          context: "Successful Infra UI EPNM milestones delivery!"
                        },
                        {
                          quote: "Thanks for Ahamed Mansoor proactively and consistently deliver hight quality of work for Angular14 upgrade and other tasks. He always contributes with CAN DO sprite and work with passionate around clock. He is a valuable team player.",
                          author: "Leena Gupta",
                          title: "Leader, Software Engineering",
                          company: "Cisco Systems",
                          context: "Positive Attitude and getting things done!"
                        },
                        {
                          quote: "Mansoor, your positive attitude and willingness to take on any UI challenge has greatly helped us meet our deliverables for Hi-UI on time! No matter how many last minute design changes were proposed, you took them in stride and were able to quickly incorporate them into the UI, while also helping out with the localization changes in parallel! Numerous late nights and cross team collaborations were involved and without your diligence and hard work we would not have been able to meet the DTHO timelines. Truly appreciate your hard work and thank you for your dedication!",
                          author: "Henry Zhen",
                          title: "Leader, Software Engineering",
                          company: "Cisco Systems",
                          context: "High quality and consistent delivery on time"
                        },
                        {
                          quote: "Mansoor played a crucial role in developing, thinking through various scenarios, and coordinating between development, U/X, and test teams for CAHI auto-remediation feature. The use case was complex that required iterating many times and changing the design. Mansoor worked through these many iterations bringing up corner cases and discussing with the team and addressing them accordingly. Mansoor has shown Cisco's values in doing the right thing for our customers.",
                          author: "Sunil Kumar Matham",
                          title: "Principal Engineer",
                          company: "Cisco Systems",
                          context: "working through complexity of CAHI Remediation feature"
                        },
                        {
                          quote: "We want to express our sincere appreciation for your invaluable contributions to aligning the UI with the Magnetic design system. Your efforts in addressing the pending common components bugs were crucial in making the project successful. Thanks to your problem-solving skills, we were able to stay on track with the Magnetic design system, resulting in a more seamless and successful outcome. Your work has made a significant impact, and we are truly grateful for your contributions.",
                          author: "Fei Yang",
                          title: "Product Designer",
                          company: "Cisco Systems",
                          context: "Thanks for your excellent efforts!"
                        },
                        {
                          quote: "Hi Mansoor, I wanted to take a moment to express my sincere appreciation for your exceptional contributions and your outstanding collaboration as a member of infra team.Your ability to foster a collaborative environment has been inspiring to all of us. Thank you so much.",
                          author: "Priyanka Kumari",
                          title: "Software Engineer",
                          company: "Cisco Systems",
                          context: "Exemplary Catalyst for a Collaborative Atmosphere"
                        }
                      ].map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          style={{
                            background: 'rgba(74, 222, 128, 0.05)',
                            border: '1px solid rgba(74, 222, 128, 0.3)',
                            borderRadius: 0,
                            padding: '12px',
                            marginBottom: '10px',
                            position: 'relative',
                          }}
                          whileHover={{
                            borderColor: '#4ade80',
                            boxShadow: '0 0 15px rgba(74, 222, 128, 0.2)',
                          }}
                        >
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#c0c0c0',
                            fontFamily: 'monospace',
                            lineHeight: '1.5',
                            fontStyle: 'italic',
                            marginBottom: '10px',
                            borderLeft: '3px solid #4ade80',
                            paddingLeft: '12px',
                          }}>
                            "{testimonial.quote}"
                          </div>
                          <div style={{
                            fontSize: '0.85rem',
                            color: '#4ade80',
                            fontFamily: 'monospace',
                            fontWeight: '600',
                            marginBottom: '2px',
                          }}>
                            {testimonial.author}
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            fontFamily: 'monospace',
                            marginBottom: '2px',
                          }}>
                            {testimonial.title}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#666',
                            fontFamily: 'monospace',
                          }}>
                            {testimonial.company}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#22c55e',
                            fontFamily: 'monospace',
                            marginTop: '6px',
                            fontWeight: '600',
                          }}>
                            ► {testimonial.context}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Achievements Section */}
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        marginBottom: '15px',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                      }}>
                        ► PROFESSIONAL ACHIEVEMENTS
                      </div>
                      
                      {[
                        {
                          title: "Great Impact - Infra-UI",
                          year: "2021 & 2022",
                          company: "Cisco Systems",
                          description: "Honoured for great impact in CNC infra-ui and got $20000 as reward"
                        },
                        {
                          title: "Grade-8 Promotion",
                          year: "2022",
                          company: "Cisco Systems",
                          description: "Got promoted as senior software engineer"
                        }
                      ].map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                          style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.4)',
                            borderRadius: 0,
                            padding: '15px',
                            marginBottom: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          whileHover={{
                            borderColor: '#4ade80',
                            boxShadow: '0 0 15px rgba(74, 222, 128, 0.3)',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: '0.95rem',
                              color: '#ffffff',
                              fontFamily: 'monospace',
                              fontWeight: '700',
                              marginBottom: '4px',
                            }}>
                              {achievement.title}
                            </div>
                            <div style={{
                              fontSize: '0.8rem',
                              color: '#c0c0c0',
                              fontFamily: 'monospace',
                              marginBottom: '2px',
                            }}>
                              {achievement.description}
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#888',
                              fontFamily: 'monospace',
                            }}>
                              {achievement.company}
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.85rem',
                            color: '#4ade80',
                            fontFamily: 'monospace',
                            fontWeight: '700',
                            background: 'rgba(74, 222, 128, 0.2)',
                            padding: '6px 10px',
                            border: '1px solid #4ade80',
                            borderRadius: 0,
                            marginLeft: '15px',
                          }}>
                            {achievement.year}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                </motion.div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  textAlign: 'center',
                }}>
                  {/* Military Classification */}
                  <motion.div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: 'rgba(74, 222, 128, 0.8)',
                      marginBottom: '40px',
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
                    {'[MARCUS SYSTEM - ONLINE]'.split('').map((char, index) => (
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

                  {/* Main Title */}
                  <motion.h1 
                    style={{ 
                      fontSize: '4rem', 
                      marginBottom: '1rem',
                      fontFamily: 'monospace',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.1em',
                      textShadow: '0 0 20px rgba(74, 222, 128, 0.5), 0 0 40px rgba(74, 222, 128, 0.3)',
                      display: 'flex',
                      gap: '5px',
                      justifyContent: 'center',
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
                    [SYSTEM READY]
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p 
                    style={{ 
                      fontSize: '1.2rem', 
                      color: '#22c55e',
                      fontFamily: 'monospace',
                      letterSpacing: '0.15em',
                      marginBottom: '30px',
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
                    AGENT: AHAMED MANSOOR
                  </motion.p>

                  {/* CV Download Button */}
                  <motion.a
                    href="/Ahamed Mansoor A - Jan 26.pdf"
                    download
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '18px 35px',
                      background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.05))',
                      borderRadius: 0,
                      textDecoration: 'none',
                      color: '#4ade80',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'visible',
                      marginTop: '20px',
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.15))';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.05))';
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.65rem', color: '#22c55e', letterSpacing: '0.2em', fontWeight: '600' }}>► ACCESS</span>
                      <span style={{ fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>CLASSIFIED FILE (CV)</span>
                    </div>
                  </motion.a>

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
                          background: '#4ade80',
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
                </div>
              )}
            </motion.div>

            {/* Futuristic Backgrounds - Removed after bootup */}
          </motion.div>

          {/* Marcus Navigation - Outside overflow-hidden container */}
          <MarcusNavigation onMissionSelect={handleMissionSelect} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
