import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledShowcaseSection = styled.section`
  position: relative;

  h2 {
    top: -3rem;
    z-index: -1;
    right: 0;
    font-size: clamp(2rem, 19vw, 11.5rem);
    letter-spacing: -3px;
    margin: 0;
  }

`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: flex-end;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 40px;
    }
  }

  &:nth-of-type(even) {
    .project-content {
      // grid-column: 9 / -1;
      grid-column: -1 / 6;
      grid-row: -1 / 12;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: -1 / 6;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 11;
      grid-row: -1 / 1;  
      // -1/3
      // grid-column: 3 / -1;
      // grid-row: 1 / -1;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
    .topLink.desktop {
      left: 0;

      .triangle {
        border-right: 80px solid transparent;
        border-top: 80px solid #3498db;
        right: auto;
        border-bottom: auto;
        border-top-left-radius: 4px;
      }
      .external {
        right: auto;
        left: 12px;
      }
    }
  }

  .project-content {
    // grid-column: 1 / 12;
    // grid-row: 2 / -1;
    position: relative;
    grid-column: 1 / 9;
    grid-row: -1 / 13;
    z-index: 9;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      /* flex-direction: column; */
      /* justify-content: center; */
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
      grid-row: unset;
      position: absolute;
    }

    @media (max-width: 480px) {
      padding: 20px 20px 0px;
    }
  }

  .project-overline {
    margin: 0 0 10px 0;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 500;
  }

  .project-title {
    font-size: clamp(24px, 5vw, 36px);
    font-weight: bold;
    pointer-events: none;

    @media (min-width: 768px) {
      margin: 0 0 15px;
    }

    @media (max-width: 768px) {
      margin: 0;

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    // ${({ theme }) => theme.mixins.boxShadow};
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    position: relative;
    z-index: 2;
    padding: 20px;
    border-radius: var(--border-radius);
    background-color: #ffffff;
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      font-weight: bold;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    // grid-column: 3 / -1;
    grid-column: 3 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.15;
      min-height: 400px;
    }

    a {
      width: 100%;
      height: 100%;
      // background-color: var(--m-blue);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        // background: transparent;
        outline: 0;

        &:before,
        .img {
          // background: var(--m-blue);
          // width: 100%;
          // height: 100%;
          background: transparent;
          // mix-blend-mode: multiply;
          // filter: brightness(150%) contrast(120%);
          // filter: sepia(100%) contrast(1) brightness(100%);
          // filter: grayscale(100%) contrast(1) brightness(100%);
          filter: none;
        }
      }

      // &:before {
      //   content: '';
      //   position: absolute;
      //   width: 100%;
      //   height: 100%;
      //   top: 0;
      //   left: 0;
      //   right: 0;
      //   bottom: 0;
      //   z-index: 3;
      //   transition: var(--transition);
      //   background-color: var(--navy);
      //   mix-blend-mode: screen;
      // }
    }

      &:hover {       
        .triangle {
          opacity: .9;
        }
      }

    .img {
      border-radius: var(--border-radius);
      // mix-blend-mode: multiply;
      // filter: grayscale(100%) contrast(1) brightness(100%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        /* filter: grayscale(100%) contrast(1) brightness(50%); */
      }
    }
  }

  .topLink.mobile {
    width: 100%;
    height: 100%;
    outline: none;

    @media (min-width: 768px) {
     display: none;
    }
  }

  .topLink.desktop {
    pointer-events: none;
     
    @media (max-width: 768px) {
      display: none;
    }
  }

  .topLink {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;

    .triangle {
      width: 0;
      height: 0;
      border-bottom: 80px solid transparent;
      border-right: 80px solid #3498db;
      z-index: 9;
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.8;
      transition: all .3s;
      border-top-right-radius: 4px;
    }

    .external {
      position: absolute;
      top: 10px;
      right: 6px;
      z-index: 11;
      width: 30px;

      svg {
        width: 26px;
        height: 26px;
        stroke: white;
      }
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 10px 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--m-dim-gray);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        /* color: var(--lightest-slate); */
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    /* color: var(--lightest-slate); */

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 831, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects">
      <StyledShowcaseSection>

      <h2 className="m-section-title">showcase</h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  
                  <a href={external ? external : github ? github : '#'} className="topLink mobile" target='_blank' rel="noreferrer">
                    <div className="triangle"></div>
                    {external && !cta && (
                    <div className="external">
                      <Icon name="External" />
                    </div>
                    )}
                  </a>

                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>
                  
                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}
                    
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'} target='_blank' rel="noreferrer">
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>

                  <div className="topLink desktop">
                    <div className="triangle"></div>
                    {external && !cta && (
                    <div className="external">
                      <Icon name="External" />
                    </div>
                  )}
                  </div>
                </div>

              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
      


      </StyledShowcaseSection>
    </section>
  );
};

export default Featured;
