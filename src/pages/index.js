import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout,
  Hero,
  About,
  Skills,
  Jobs,
  Showcase,
  Projects,
  Contact,
  CursorFollow,
} from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth > 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Skills />
        <Jobs />
        <Showcase />
        <Projects />
        <Contact />
        {isDesktop && <CursorFollow />}
      </StyledMainContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
