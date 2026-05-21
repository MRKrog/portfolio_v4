import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { StyledProjectsSection, StyledProject } from './styles/projectsStyles';

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              images {
                childImageSharp {
                  gatsbyImageData(width: 900, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
                publicURL
              }
            }
            html
          }
        }
      }
    }
  `);

  const revealProjects = useRef([]);
  const transitionRefs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node);
  const projectsToShow = projects.slice(0, GRID_LIMIT);

  projectsToShow.forEach((_, i) => {
    transitionRefs.current[i] = transitionRefs.current[i] || React.createRef();
  });

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, external, title, tech } = frontmatter;

    return (
      <div className="project-inner">

        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 className="m-section-title">More</h2>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow.map(({ node }, i) => (
              <CSSTransition
                key={i}
                nodeRef={transitionRefs.current[i]}
                classNames="fadeup"
                timeout={300}
                exit={false}
              >
                <StyledProject
                  ref={el => {
                    transitionRefs.current[i].current = el;
                    revealProjects.current[i] = el;
                  }}
                >
                  {projectInner(node)}
                </StyledProject>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
