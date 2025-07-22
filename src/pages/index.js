import React from 'react';
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
  CursorFollow 
} from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => {
  // eslint-disable-next-line no-undef
  const isDesktop = typeof window !== 'undefined' && window && window.innerWidth > 768;

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Showcase />
        <Projects />
        <Jobs />
        <Contact />   
        <Skills />
        {isDesktop && <CursorFollow />}
      </StyledMainContainer>
    </Layout>
  )
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
