import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--m-light-gray);
  // background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: {isMounted ? 1 : 0};
    opacity: ${({ $isMounted }) => ($isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });
    loader
      .add({
        targets: '#logo path',
        delay: 200, // Moderately reduced delay
        duration: 1000, // Moderately reduced duration
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
        stroke: ['#0088CC', '#0088CC'], // Change stroke color from white to tomato
        strokeWidth: [3, 1], // Animate stroke width
      })
      .add({
        targets: '#logo #B',
        duration: 500, // Moderately reduced duration
        easing: 'easeInOutQuart',
        opacity: 1,
        scale: [0.5, 1], // Scale up the element
        rotate: '1turn', // Rotate the element
      })
      .add({
        targets: '#logo',
        delay: 300, // Moderately reduced delay
        duration: 200, // Moderately reduced duration
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
        rotate: '1turn', // Rotate the element
      })
      .add({
        targets: '.loader',
        duration: 150, // Moderately reduced duration
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" $isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func,
};

export default Loader;
