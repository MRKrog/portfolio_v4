import React, { useState, useEffect, useRef, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StyledHeroSection } from './styles/heroStyles';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize Vanta.js NET effect
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return;
    }

    const initVanta = async () => {
      if (vantaRef.current && !vantaEffect.current) {
        try {
          const [vantaModule, threeModule] = await Promise.all([
            import('vanta/dist/vanta.net.min'),
            import('three')
          ]);
          
          const NET = vantaModule.default || vantaModule;
          const THREE = threeModule.default || threeModule;
          
          vantaEffect.current = NET({
            el: vantaRef.current,              // DOM element to attach the effect to
            THREE: THREE,                      // Three.js library reference for 3D rendering
            color: 0xFFFFFF,                   // Hex color for dots and connecting lines (gray)
            backgroundColor: 0xEEEEEE,         // Background color to match page (light gray)
            points: 5.00,                      // Number of animated dots/nodes in the network
            maxDistance: 30.00,                // Maximum distance between dots before lines disappear
            spacing: 20.00,                    // Spacing between dots (affects density)
            mouseControls: true,               // Enable mouse interaction (dots follow cursor)
            touchControls: true,               // Enable touch interaction on mobile devices
            gyroControls: false,               // Disable device gyroscope controls
            minHeight: 200.00,                 // Minimum height for the effect to render
            minWidth: 200.00,                  // Minimum width for the effect to render
            scale: 1.00,                       // Overall scale of the effect (1.0 = normal size)
            scaleMobile: 1.00                  // Scale on mobile devices (1.0 = same as desktop)
          });
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      }
    };

    const timer = setTimeout(initVanta, 1000);

    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const one = <h3>Michael Krog</h3>
  const two = <h4>Transforming concepts into code</h4>
  
  const three = (
    <p>
      Welcome! I'm a <strong>developer</strong> passionate about building interactive web experiences 
      <br/>from dynamic single page <strong>apps</strong> to robust <strong>web platforms</strong>.<br/>
      <div className="hero-cta-buttons">
        <a className="hero-btn" href="/#projects">See my work</a>
        <a className="hero-btn" href="/#about">Get to know me</a>
        <a className="hero-btn" href="/#contact">Let's connect</a>
      </div>
    </p>
  );

  const items = [
    {
      content: one,
      nodeRef: createRef(null),
    },
    {
      content: two,
      nodeRef: createRef(null),
    },
    {
      content: three,
      nodeRef: createRef(null),
    }, 
  ];

  return (
    <StyledHeroSection>
      {!prefersReducedMotion && (
        <div 
          ref={vantaRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 0
          }} 
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {prefersReducedMotion ? (
          <>
            {items.map(({ content }, i) => (
              <div key={i}>{content}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map(({ content, nodeRef }, i) => (
                <CSSTransition 
                  nodeRef={nodeRef} 
                  key={i} 
                  classNames="fadeup" 
                  timeout={loaderDelay}
                >
                  <div 
                    style={{ transitionDelay: `${i + 1}00ms` }}
                    ref={nodeRef}
                  >
                    {content}
                  </div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
