import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { StyledAboutSection, StyledPic, StyledText } from './styles/aboutStyles';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';


const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      
      <h2 className="m-section-title">intro</h2>

      <div className="inner">

        <StyledText>
          <div>

            <h3 className="about-title">
              A Brief <br/> Who's <span className='name-gradient'>Mike!</span>
            </h3>
  
            <h5 className="about-subtitle">Full Stack Developer | Designer | Problem Solver</h5>

            <p className="about-copy">
              Orignally from the Chicago area, I’ve always been the type to take things apart just to see how they tick. My fascination with the web started early, inspecting and rebuilding sites for fun. That drive to understand and create led me to DePaul University, and now fuels my work as a web developer and designer.
            </p>

            <p className="about-copy">
              At the moment, I’m with <a href="https://levar.io/" target="_blank" rel="noreferrer">levAR</a>, a startup I’ve been helping build since day one. 
              We’re revolutionizing eCommerce with <b>3D</b> and <b>Augmented Reality</b>, making online shopping as immersive as in-store experiences.
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