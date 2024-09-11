import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import meImg from '../../images/me.jpg';
// import meImg from '../../images/portfolio_me.jpg';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .name-gradient {
    background: linear-gradient(90deg, #0088CC, #00d1ff);
    // background: linear-gradient(90deg, #6a00ff, #00d1ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .test-circle {
    top: 0;
    position: absolute;
    width: 50vw; // Change as needed
    height: 85vh; // Change as needed
    border-radius: 50%;
    background: #ffffff8f;
    right: 0;
    opacity: .3;
    z-index: -1;
    transform: scaleX(0.8) scaleY(0.76) rotate(45deg); // Change as needed
  }

  h2 {
    top: 4rem;
    right: 0;
    z-index: 2;
    font-size: 8rem;
    // color: transparent; /* Make the fill color transparent */
    // -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); 
    // mix-blend-mode: overlay;
    // color: var(--m-dim-gray);
    // color: rgba(0, 0, 0, 0.02);
  }


  .inner {
    display: grid; // Change from flex to grid
    grid-template-columns: 55% 45%; // Adjusts the columns to a 55/45 split
    grid-gap: 20px; // Adjust this value for the desired padding between sections
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  width: 100%;
  z-index: -1;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: #cccccc;

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);

      // transform: scaleX(-1);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--m-light-gray);
      mix-blend-mode: screen;
    }

    &:after {
      border: 1px solid var(--m-gray);
      top: 14px;
      left: 14px;
      z-index: -1;
    }

  }
`;

const StyledText = styled.div`
  right: 0;
  z-index: 10;
  mix-blend-mode: color-dodge;


  h3 {
    padding-bottom: 12px;
    font-size: 3rem;
    font-weight: bold; 
    line-height: 1.1; 
    margin: 0;
    letter-spacing: -0.02em;
  }

  h5 {
    margin: 0;
    padding-bottom: 12px;
    /* font-family: monospace; */
    /* color: var(--m-light-black); */
    /* color: var(--m-gray); */
    color: var(--m-dim-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 300;
  }

  p.about-copy {
    // font-size: var(--fz-xl);
    // font-size: var(--fz-copy);
  }

  .next-button {
    display: flex;
    padding-top: 1em;

    button {
      ${({ theme }) => theme.mixins.button};
    }
  }
`;


const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      
      <div className="test-circle"></div>
      
      <h2 className="m-section-title">about me</h2>

      <div className="inner">

        <StyledText>
          <div>

            <h3 className="about-title">
              A Brief <br/> Who's <span className='name-gradient'>Mike!</span>
            </h3>
  
            <h5 className="about-subtitle">Full Stack Developer | Designer | Problem Solver</h5>

            <p className="about-copy">
              Originally from the Chicago area, I’ve always been passionate about understanding how things work. Growing up, 
              I loved inspecting webpage code and recreating it. This curiosity led me to study at DePaul University, and after graduation, 
              I began working as a web developer and designer.
            </p>

            <p className="about-copy">
              Currently, I’m working at <a href="https://levar.io/" target="_blank">levAR</a>, a startup that I helped build. We’re revolutionizing 
              eCommerce with <b>3D</b> and <b>Augmented Reality</b>, making online shopping as immersive as in-store experiences.
            </p>

            <p className="about-copy">
              When I'm away from the keyboard, I'm probably dreaming about skiing, planning my next trip, or stopping to pet every dog I see.
            </p>

          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src={'../../images/portfolio_me.jpg'}
              // src={'../../images/me.jpg'}
              width={300}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>

      </div>

    </StyledAboutSection>
  );
};

export default About;