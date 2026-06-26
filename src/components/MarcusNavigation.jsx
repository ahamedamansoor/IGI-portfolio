import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const missions = [
  { id: 1, name: 'HOME', icon: '🏠' },
  { id: 2, name: 'ABOUT', icon: '👤' },
  { id: 3, name: 'EXPERIENCE', icon: '💼' },
  { id: 4, name: 'PROJECTS', icon: '📁' },
  { id: 5, name: 'EXPERTISE', icon: '📋' },
  { id: 6, name: 'RECOGNITION', icon: '🏆' },
  { id: 7, name: 'CONTACT', icon: '📞' },
];

export default function MarcusNavigation({ onMissionSelect }) {
  const [activeMission, setActiveMission] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMissionClick = (mission) => {
    setActiveMission(mission.id);
    if (onMissionSelect) {
      onMissionSelect(mission);
    }
  };

  return (
    <>
      {!isExpanded && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{
            position: 'fixed',
            top: '40%',
            left: '5px',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            background: '#000',
            border: '1px solid #4ade80',
            borderRadius: '0',
            color: '#4ade80',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            zIndex: 999,
          }}
        >
          ☰
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{
          opacity: 1,
          scaleY: 1,
          x: isExpanded ? 0 : -180,
        }}
        transition={{
          scaleY: { duration: 0.3, ease: 'easeOut' },
          opacity: { duration: 0.2 },
          x: { duration: 0.3, ease: 'easeOut' },
        }}
        style={{
          position: 'fixed',
          top: '40%',
          left: 0,
          transform: 'translateY(-50%)',
          transformOrigin: 'center center',
          width: isExpanded ? '200px' : '40px',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: '100%',
            background: '#000',
            border: '1px solid #4ade80',
            borderRadius: '0',
            padding: isExpanded ? '10px' : '5px',
          }}
        >
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              width: '20px',
              height: '20px',
              background: 'transparent',
              border: '1px solid #4ade80',
              borderRadius: '0',
              color: '#4ade80',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
            }}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ◄
          </motion.button>

          <div style={{ marginTop: isExpanded ? '20px' : '0' }}>
            {missions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleMissionClick(mission)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isExpanded ? '6px 8px' : '5px',
                  marginBottom: '2px',
                  background: activeMission === mission.id ? 'rgba(74, 222, 128, 0.3)' : 'transparent',
                  border: activeMission === mission.id ? '1px solid #4ade80' : 'none',
                  borderRadius: '0',
                  cursor: 'pointer',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                }}
              >
                <div
                  style={{
                    fontSize: isExpanded ? '14px' : '16px',
                    marginRight: isExpanded ? '8px' : '0',
                  }}
                >
                  {mission.icon}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontSize: '10px',
                        color: activeMission === mission.id ? '#4ade80' : '#888',
                        fontFamily: 'monospace',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {mission.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
