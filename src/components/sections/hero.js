import React, { useState, useEffect, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
// import FlippingText from '../flippingText'

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    color: var(--m-black);
    // font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      // margin: 0 0 20px 2px;
    }
  }

  h3 {
    line-height: .95;
    margin: 0;
    font-size: clamp(65px, 8vw, 100px);
    letter-spacing: 0.03em;
    font-family: var(--m-font-title);
  }

  h4 {
    font-family: var(--m-font-sub-title);
    color: var(--m-light-black);
    font-size: clamp(30px, 6vw, 28px);
    text-transform: lowercase;
    line-height: 1.1;
    margin: 0;
    font-weight: 200;
    letter-spacing: 4px;
    text-align: center;
  }

  p {
    padding-top: 12px;
    max-width: 750px;
    text-align: center;
    /* font-size: clamp(34px, 6vw, 12); */
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;


const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const one = <h3>Michael Krog</h3>
  const two = <h4>Crafting clever code, one commit at a time</h4>
  const three = (
    <p>
      Welcome! I'm a <strong>developer</strong> passionate about building interactive web experiences 
      <br/>from dynamic single page <strong>apps</strong> to robust <strong>web platforms</strong>.<br/>
      <a href="/#projects">See my work</a>, <a href="/#about">get to know me</a>, or <a href="/#contact">let's connect</a>!
    </p>
  );

  const items = [
    {
      // content: <FlippingText />,
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
    </StyledHeroSection>
  );
};

export default Hero;
