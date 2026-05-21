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

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion || !vantaRef.current) {
      return undefined;
    }

    const initVanta = async () => {
      if (!vantaRef.current || vantaEffect.current) return;
      try {
        const [vantaModule, threeModule] = await Promise.all([
          import('vanta/dist/vanta.net.min'),
          import('three'),
        ]);
        const NET = vantaModule.default || vantaModule;
        const THREE = threeModule.default || threeModule;

        vantaEffect.current = NET({
          el: vantaRef.current,
          THREE,
          color: 0xffffff,
          backgroundColor: 0xeeeeee,
          points: 5.0,
          maxDistance: 30.0,
          spacing: 20.0,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        });
      } catch (error) {
        console.error('Error initializing Vanta:', error);
      }
    };

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              initVanta();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(vantaRef.current);
    } else {
      initVanta();
    }

    return () => {
      if (observer) observer.disconnect();
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const one = <h3>Michael Krog</h3>;
  const two = <h4>Transforming concepts into code</h4>;

  const three = (
    <div className="hero-intro">
      <p>
        Welcome! I&#39;m a <strong>developer</strong> passionate about building interactive web experiences
        from dynamic single page <strong>apps</strong> to robust <strong>web platforms</strong>.
      </p>
      <div className="hero-cta-buttons">
        <a className="hero-btn primary" href="/#showcase">View Projects</a>
        <a className="hero-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
        <a className="hero-btn" href="/#contact">Let&#39;s Connect</a>
      </div>
    </div>
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
            zIndex: 0,
            opacity: 0.5,
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
