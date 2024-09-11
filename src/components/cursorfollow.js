import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CursorFollowSection = styled.section`
  width: 100vw; /* Take up the whole viewport width */
  height: 100vh;
  position: fixed; /* equivalent to 'fixed' in Tailwind */
  top: 0; 
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 30; /* equivalent to 'z-30' in Tailwind */
  transition: all 0.3s ease; 
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
`;

const CursorFollow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CursorFollowSection
      style={{
        // background: `radial-gradient(300px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.1), rgba(255, 255, 255, 0) 100%)`,
        // background: `radial-gradient(500px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.05), rgba(255, 255, 255, 0) 70%)`,
        background: `radial-gradient(500px at ${position.x}px ${position.y}px, rgba(159, 159, 159, 0.15), transparent 80%)`,
        // background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        // filter: 'blur(8px)',
        opacity: 0.65,
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        // filter: 'blur(6px)',
        // background: `radial-gradient(300px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.03), rgba(255, 255, 255, 0) 100%)`,
        // background: `radial-gradient(400px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.05), #ffffff00 80%)`,
        // background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
        // background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2), transparent 80%)`,
      }}
    />
  );
};

export default CursorFollow;
