import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function About() {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);

  const sections = [
    {
      title: '[IDENTITY]',
      subtitle: 'AGENT PROFILE',
      content: "Hello, I'm Ahamed Mansoor—a full-stack developer with a relentless drive to build complete, production-ready applications from concept to deployment. With over 6 years of experience spanning frontend finesse and backend architecture, I don't just craft interfaces—I architect entire ecosystems. From pixel-perfect user experiences to robust server-side systems, I transform complex requirements into seamless, scalable solutions that stand the test of production.",
      expanded: "",
      skills: []
    },
    {
      title: '[MY JOURNEY]',
      subtitle: 'MISSION HISTORY',
      content: "My journey into web development began with a bold leap from Electrical Engineering—where I spent 2.5 years mastering industrial programming and commissioning. That experience gave me the foundation, but my passion for creating beautiful, functional interfaces pulled me toward a new horizon. I embraced the challenge, transforming my technical discipline into creative innovation. Today, I channel that same dedication into crafting digital experiences that inspire and delight, proving that the best paths are often the ones we forge ourselves.",
      expanded: "",
      skills: []
    },
    {
      title: '[INTERESTS]',
      subtitle: 'OFF-DUTY ACTIVITIES',
      content: "Beyond the keyboard, I find inspiration in exploring the frontiers of technology, diving into immersive gaming worlds, and conquering mountain trails. These passions fuel my creativity and keep my mind sharp. I believe that growth never stops—every challenge is an opportunity to learn, every setback a lesson, and every success a stepping stone. In the ever-evolving landscape of web development, I don't just adapt—I thrive on pushing boundaries and turning the impossible into the inevitable.",
      expanded: "",
      skills: []
    }
  ];

  useEffect(() => {
    const decryptTimer = setTimeout(() => setIsDecrypted(true), 500);
    return () => clearTimeout(decryptTimer);
  }, []);

  useEffect(() => {
    if (!isDecrypted) return;

    const typeTimer = setTimeout(() => {
      if (sectionIndex < sections.length) {
        if (charIndex < sections[sectionIndex].content.length) {
          setTypedText(prev => {
            const currentSections = prev.split('|||');
            while (currentSections.length <= sectionIndex) {
              currentSections.push('');
            }
            currentSections[sectionIndex] += sections[sectionIndex].content[charIndex];
            return currentSections.join('|||');
          });
          setCharIndex(charIndex + 1);
        } else {
          setSectionIndex(sectionIndex + 1);
          setCharIndex(0);
        }
      }
    }, 15);

    return () => clearTimeout(typeTimer);
  }, [isDecrypted, sectionIndex, charIndex, sections]);

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: 1,
        scaleY: 1,
      }}
      transition={{
        scaleY: { duration: 0.3, ease: 'easeOut' },
        opacity: { duration: 0.2 },
      }}
    >
      {/* Navigation Buttons - Sticky at top */}
      <div className="about-header">
        <button
          onClick={() => setCurrentCard(prev => Math.max(0, prev - 1))}
          disabled={currentCard === 0}
          className="about-nav-btn"
          style={{
            background: currentCard === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.2)',
            color: currentCard === 0 ? '#4ade80' : '#ffffff',
            cursor: currentCard === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ◄ PREV
        </button>
        <span className="about-nav-counter">
          {currentCard + 1} / {sections.length}
        </span>
        <button
          onClick={() => setCurrentCard(prev => Math.min(sections.length - 1, prev + 1))}
          disabled={currentCard === sections.length - 1}
          className="about-nav-btn"
          style={{
            background: currentCard === sections.length - 1 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(74, 222, 128, 0.2)',
            color: currentCard === sections.length - 1 ? '#4ade80' : '#ffffff',
            cursor: currentCard === sections.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          NEXT ►
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="about-content">
        {/* Current Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              maxWidth: '700px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="about-card"
            >
              {/* Section Header */}
              <div className="about-section-header">
                <h3
                  style={{
                    fontSize: '1.2rem',
                    color: '#4ade80',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    marginBottom: '6px',
                    fontWeight: '700',
                  }}
                >
                  {sections[currentCard]?.title || '[SECTION]'}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#22c55e',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  fontWeight: '600',
                }}>
                  {sections[currentCard]?.subtitle || 'CLASSIFIED'}
                </p>
              </div>

              {/* Section Content */}
              <p style={{ 
                fontSize: '1rem', 
                color: '#ffffff',
                marginBottom: '15px',
                fontWeight: '400',
              }}>
                {typedText.split('|||')[currentCard] || ''}
                {currentCard === sectionIndex && charIndex < sections[sectionIndex].content.length && (
                  <span
                    style={{ 
                      color: '#4ade80',
                      fontWeight: 'bold',
                    }}
                  >
                    ▊
                  </span>
                )}
              </p>

              {/* Expanded Content - Show only if it exists */}
              {sections[currentCard]?.expanded && (
                <div style={{
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px solid rgba(74, 222, 128, 0.2)',
                }}>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#e0e0e0',
                    marginBottom: '15px',
                    fontStyle: 'italic',
                    whiteSpace: 'pre-line',
                  }}>
                    {sections[currentCard]?.expanded}
                  </p>

                  {/* Skill Bars */}
                  {sections[currentCard]?.skills && sections[currentCard]?.skills.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      {sections[currentCard]?.skills.map((skill, skillIndex) => {
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
                        return (
                        <div
                          key={skillIndex}
                          style={{
                            marginBottom: '6px',
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '3px',
                          }}>
                            <span style={{
                              fontSize: '0.8rem',
                              color: '#ffffff',
                            }}>{skill}</span>
                            <span style={{
                              fontSize: '0.7rem',
                              color: '#4ade80',
                            }}>{percentage}%</span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '4px',
                            background: 'rgba(74, 222, 128, 0.2)',
                            borderRadius: 0,
                            overflow: 'hidden',
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: skillIndex * 0.05, duration: 0.5 }}
                              style={{
                                height: '100%',
                                background: '#4ade80',
                                borderRadius: 0,
                              }}
                            />
                          </div>
                        </div>
                      )})}
                    </div>
                  )}
                </div>
              )}

              {/* Skill Bars - Show when expanded is empty but skills exist */}
              {!sections[currentCard]?.expanded && sections[currentCard]?.skills && sections[currentCard]?.skills.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  {sections[currentCard]?.title === '[EXPERTISE]' ? (
                    // Improved Grid Chart for EXPERTISE card
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: '10px',
                    }}>
                      {sections[currentCard]?.skills.map((skill, skillIndex) => {
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
                            {/* Level Indicator Bar */}
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '4px',
                              height: '100%',
                              background: percentage >= 95 ? '#4ade80' : percentage >= 90 ? '#22c55e' : '#16a34a',
                            }} />

                            {/* Skill Name */}
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

                            {/* Progress Bar */}
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

                            {/* Level Badge */}
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
                  ) : (
                    // Simple bars for other cards
                    <div style={{ marginTop: '15px' }}>
                      {sections[currentCard]?.skills.map((skill, skillIndex) => {
                        const skillPercentages = {
                          'HTML5': 95, 'CSS3': 95, 'SASS': 90, 'JavaScript ES6': 95,
                          'TypeScript': 92, 'Angular 8-19': 90, 'React': 95, 'Next.js': 90,
                          'RxJS': 85, 'Bootstrap': 92, 'D3.js': 85, 'AG-Grid': 88,
                          'SVG': 90, 'Canvas': 85, 'Node.js': 88, 'Go Lang': 80,
                          'REST API': 92, 'Jenkins': 85, 'SonarQube': 85, 'Playwright': 88,
                          'Jasmine': 85, 'Git': 95, 'Azure': 85, 'Webpack': 88,
                          'Figma': 90, 'Pixel Perfect Pro': 95
                        };
                        const percentage = sections[currentCard]?.title === '[INTERESTS]'
                          ? [86, 97, 95, 88][skillIndex]
                          : skillPercentages[skill] || 90;

                        return (
                          <div
                            key={skillIndex}
                            style={{
                              marginBottom: '6px',
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '3px',
                            }}>
                              <span style={{
                                fontSize: '0.8rem',
                                color: '#ffffff',
                              }}>{skill}</span>
                              <span style={{
                                fontSize: '0.7rem',
                                color: '#4ade80',
                              }}>{percentage}%</span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '4px',
                              background: 'rgba(74, 222, 128, 0.2)',
                              borderRadius: 0,
                              overflow: 'hidden',
                            }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: skillIndex * 0.05, duration: 0.5 }}
                                style={{
                                  height: '100%',
                                  background: '#4ade80',
                                  borderRadius: 0,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
