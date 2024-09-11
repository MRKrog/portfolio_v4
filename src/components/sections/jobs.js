import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  max-width: 900px;

  h2 {
    top: 100px;
    left: 0;
    z-index: 2;
  }

  .test-circle {
    bottom: 0;
    position: absolute;
    width: 62vw;
    height: 83vh;
    border-radius: 50%;
    background: #ffffff8f;
    left: 0;
    opacity: .3;
    z-index: -1;
    transform: scaleX(0.8) scaleY(0.86) rotate(131deg);
  }

  .inner {
    display: flex;
    flex-direction: column;
    padding-top: 120px;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  } 
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-right: 1px solid var(--m-lightest-gray);
  background-color: transparent;
  color: ${({ $isActive }) => ($isActive ? 'var(--m-blue)' : 'var(--m-dim-gray)')};
  font-family: var(--m-font-sub-title);
  font-size: var(--fz-lg);
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  letter-spacing: .1em;

  &:first-child {
    // border-left: 1px solid var(--m-lightest-gray);
  }

  &:last-child {
    border: none;
  }

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 1px solid var(--m-dim-gray);
    text-align: center;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 700;
    padding-bottom: 12px;
    font-size: 1.75rem;
    line-height: 1.1; 
    margin: 0;

    
    .company {
      color: var(--m-blue);
    }
  }

  .range {
    margin-bottom: 20px;
    color: var(--m-dim-gray);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .skills-container {
    margin-left: 20px;

    h5 {
      margin: 0;
      font-size: 18px;
      padding-top: 15px;
      padding-bottom: 5px;
    }

    ul.skills-list {
      display: grid;
      grid-template-columns: repeat(3, minmax(140px, 200px));
      grid-gap: 0 10px;
      padding: 0;
      margin: 15px 0 0 0;
      overflow: hidden;
      list-style: none;

      li {
        position: relative;
        margin-bottom: 10px;
        padding-left: 20px;
        font-family: var(--font-mono);
        color: var(--m-light-black);
        font-size: var(--fz-sm);
        display: flex;
        align-items: center;

        &:before {
          content: '•';
          position: absolute;
          left: 0;
          // color: var(--m-blue);
          font-size: var(--fz-sm);
          line-height: 12px;
        }
      }
    }

  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              companyFull
              location
              range
              url
              skills
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>

      <div className="test-circle"></div>
       
      <h2 className="m-section-title">day job</h2>

      <div className="inner">
        <div style={{ display: 'flex', width: '100%' }}>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { company } = node.frontmatter;

              return (
                <StyledTabButton
                  key={i}
                  $isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  // ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{company}</span>
                </StyledTabButton>
              );
            })}
        </StyledTabList>
        </div>

        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              // const { frontmatter, html } = node;
              const { frontmatter = {}, html } = node || {};
              const { title, url, company, range, companyFull, skills } = frontmatter;
              
              const nodeRef = React.createRef(null)

              return (
                <CSSTransition 
                  key={i} 
                  nodeRef={nodeRef}
                  in={activeTabId === i} 
                  timeout={250} 
                  classNames="fade"
                >
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}
                    ref={nodeRef}
                    className="tab-panel"
                  >
                    <h3>
                      <span>{title}: </span>
                      <span className="company">
                        {/* &nbsp;@&nbsp; */}
                        &nbsp;
                        <a href={url} className="inline-link">
                          {companyFull}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    <div className="skills-container">
                      <h5>Job Focus:</h5>
                      <ul className="skills-list">
                        {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
                      </ul>
                    </div>

                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>



      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
