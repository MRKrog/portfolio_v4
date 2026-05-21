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
      <h2 className="m-section-title">about</h2>

      <div className="inner">
        <StyledText>
          <div className="about-content">
            <div className="about-header">
              <h3 className="about-title">
                A Brief Who&#39;s <span className="name-gradient">Mike!</span>
              </h3>
              <h5 className="about-subtitle">Full Stack Developer | AR/3D Specialist | eCommerce</h5>
            </div>

            <p className="about-copy">
              I&#39;m a full-stack developer specializing in <strong>AWS</strong>, <strong>React</strong>, and <strong>Node.js</strong>,
              with a focus on AR-enhanced eCommerce. At{' '}
              <a href="https://levar.io/" target="_blank" rel="noreferrer">levAR</a> I&#39;ve been
              building the platform since day one bringing <strong>3D</strong> and{' '}
              <strong>augmented reality</strong> to online stores so shopping feels closer to the
              in-store experience.
            </p>

            <p className="about-copy">
              Originally from the Chicago area, I&#39;ve always been the type to take things apart
              just to see how they tick. That curiosity led me through DePaul University and now
              fuels my work designing and building for the web.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/portfolio_me.jpg"
              width={400}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot of Michael Krog"
            />
          </div>
          <div className="image-decoration bottom-right" />
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;