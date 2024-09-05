import React, { useState, useEffect, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import FlippingText from '../flippingText'

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
    // margin: 0 0 30px 4px;
    color: var(--m-black);
    // font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      // margin: 0 0 20px 2px;
    }
  }

  h3 {
    line-height: 1;
    margin: 0;
    font-size: clamp(40px, 8vw, 100px);
    // text-transform: uppercase;
    letter-spacing: 0.02em;
    font-family: var(--m-font-title);
    // color: var(--m-medium-black);
    color: var(--m-light-black);
  }

  h4 {
    font-family: var(--m-font-sub-title);
    color: var(--m-dim-gray);
    font-size: clamp(20px, 6vw, 31px);
    text-transform: lowercase;
    line-height: 1;
    margin: 0;
    font-weight: 100;
    letter-spacing: 4px;
    text-align: center;
  }

  p {
    padding-top: 12px;
    max-width: 750px;
    // color: var(--m-dim-gray);
    text-align: center;
    font-weight: 500;
    // font-size: var(--fz-xl);
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
  }, []);

  const two = <h4>Crafting clever code, one commit at a time</h4>
  const three = (
    <p>
      {/* <b>Welcome to my portfolio!</b>{" "} */}
      Welcome to my portfolio!{" "}
      Explore projects, past and present, each one crafted with creativity and a dash of fun.{" "}
      Feel free to reach out and <a>lets chat</a>
    </p>
  );

  const items = [
    {
      content: <FlippingText />,
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
