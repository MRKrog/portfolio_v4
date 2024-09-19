import React, { useState, useEffect, useRef, createRef } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
// import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { MLogo, IconLogo, IconHex } from '@components/icons';
import { Icon as IconifyIcon } from "@iconify/react";


const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 1;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--m-light-gray);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${({ $scrollDirection, $scrolledToTop }) =>
    $scrollDirection === 'up' &&
      !$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        // background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${({ $scrollDirection, $scrolledToTop }) =>
    $scrollDirection === 'down' &&
      !$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--m-dim-gray);
  counter-reset: item 0;
  z-index: 12;

  h4 {
    font-size: var(--fz-sm);
    // color: var(--m-dim-gray);
    font-weight: 500;
    font-family: var(--m-font-sub-title);
    margin-bottom: 0;
  }

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--m-dim-gray);
      width: 72px;
      // height: 72px;
      position: relative;
      z-index: 1;

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon {
            fill: var(--navy);
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-1px, -1px);
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 15px;
      position: relative;
      font-size: var(--fz-sm-md);
      font-family: var(--m-font-sub-title);
      font-weight: 300;

      a {
        position: relative;
        padding-bottom: 5px;
        font-weight: 300;
        /* font-weight: 400; */
        display: flex;
        align-items: center;
        /* color: var(--m-medium-black); */

        &::after { // Add this block
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease-in-out;
        }

        &:hover {
          opacity: .75;

          &::after { // Add this block
            width: 100%;
          }
        }

      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome }) => {
  const transitionRef = useRef(null);
  const resumeRef = useRef(null);
  const menuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex="-1">
      <Link to="/" aria-label="home">
        <div className="logo-container">
          <MLogo />
        </div>
      </Link>
      {/* {!isHome ? (
        <a href="/" aria-label="home">
          <div className="logo-container">
            <MLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="logo-container">
            <MLogo />
          </div>
        </Link>
      )} */}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  const navLinks = [
    {
      name: 'about me',
      url: '/#about',
      nodeRef: React.createRef(null),
    },
    {
      name: 'day job',
      url: '/#jobs',
      nodeRef: React.createRef(null),
    },
    {
      name: 'showcase',
      url: '/#projects',
      nodeRef: React.createRef(null),
    },
    {
      name: 'say hi',
      icon: <IconifyIcon icon="twemoji:waving-hand" style={{ width: 18, height: 18, marginLeft: 10, verticalAlign: 'text-bottom' }} />,
      url: '/#contact',
      nodeRef: React.createRef(null),
    },
  ];
  

  return (
    <StyledHeader $scrollDirection={scrollDirection} $scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>

            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup>
              {isMounted && (
                <CSSTransition 
                  nodeRef={transitionRef}
                  classNames={fadeClass}
                  timeout={timeout}
                >
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name, nodeRef, icon }, i) => (
                      <CSSTransition 
                        key={i}
                        nodeRef={nodeRef} 
                        classNames={fadeDownClass} 
                        timeout={timeout}
                      >
                        <li 
                          // key={i} 
                          ref={nodeRef}
                          style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}
                        >
                          <Link to={url}>{name}{icon}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {/* {isMounted && (
                  <CSSTransition nodeRef={resumeRef} classNames={fadeDownClass} timeout={timeout}>
                    <div ref={resumeRef} style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )} */}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition nodeRef={menuRef} classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
