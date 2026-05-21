import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { Icon as IconifyIcon } from '@iconify/react';
import { StyledShowcaseSection, StyledProjectsGrid, StyledProject } from './styles/showcaseStyles';

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)$/i;

const CustomArrow = ({ className, style, onClick, direction }) => (
  <button
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      borderRadius: '50%',
      border: 'none',
      width: '2.5rem',
      height: '2.5rem',
      zIndex: 2,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.7rem',
      cursor: 'pointer',
    }}
    onClick={onClick}
    aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
  >
    {direction === 'next' ? (
      <IconifyIcon icon="fluent:arrow-right-12-filled" width="1.5em" height="1.5em" />
    ) : (
      <IconifyIcon icon="fluent:arrow-left-12-filled" width="1.5em" height="1.5em" />
    )}
  </button>
);

const MediaItem = ({ media, index = 0 }) => {
  if (media && media.childImageSharp) {
    return (
      <GatsbyImage
        image={media.childImageSharp.gatsbyImageData}
        alt={`Screenshot ${index + 1}`}
        className="modal-media"
        imgStyle={{ objectFit: 'contain', maxHeight: '500px' }}
      />
    );
  }

  const url = media?.publicURL || media;

  if (typeof url === 'string' && VIDEO_EXT.test(url)) {
    return (
      <video
        className="modal-media"
        src={url}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    );
  }

  if (typeof url === 'string') {
    return <img className="modal-media" src={url} alt={`Screenshot ${index + 1}`} />;
  }

  return null;
};

const ModalLinks = ({ raw }) => {
  if (!raw || raw === 'null') return null;
  let links = [];
  try {
    links = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  return (
    <div className="modal-links">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link-btn"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

const ModalSlide = ({ media, copy, links, index }) => (
  <div className="modal-slide">
    <MediaItem media={media} index={index} />
    {copy && <div className="modal-copy">{copy}</div>}
    <ModalLinks raw={links} />
  </div>
);

const Showcase = () => {
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
                publicURL
              }
              coverVideo
              tech
              github
              external
              cta
              images {
                childImageSharp {
                  gatsbyImageData(width: 900, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
                publicURL
              }
              videos
              videoLinks
              modalCopy
              modalLinks
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [], modalCopy: [], modalLinks: [], title: '' });
  const previousFocus = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const openModal = (images, modalCopy, modalLinks, title) => {
    previousFocus.current = document.activeElement;
    setModalData({
      images: images || [],
      modalCopy: modalCopy || [],
      modalLinks: modalLinks || [],
      title: title || 'Project details',
    });
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalData({ images: [], modalCopy: [], modalLinks: [], title: '' });
    if (previousFocus.current && previousFocus.current.focus) {
      previousFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const onKey = e => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('hidden');

    if (closeButtonRef.current) closeButtonRef.current.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('hidden');
    };
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  return (
    <section id="showcase">
      <StyledShowcaseSection>
        <h2 className="m-section-title">showcase</h2>

        <StyledProjectsGrid>
          {featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const slug = frontmatter.slug || `showcase-${i + 1}`;
            const numericId = `showcase-${String(i + 1).padStart(2, '0')}`;
            const {
              external,
              title,
              tech,
              github,
              cover,
              coverVideo,
              cta,
              images,
              videos,
              videoLinks,
              modalCopy,
              modalLinks,
            } = frontmatter;

            const image = cover ? getImage(cover) : null;
            const allMedia = [...(videos || []), ...(videoLinks || []), ...(images || [])];
            const topLinkHref = external || github || '#';

            return (
              <React.Fragment key={i}>
                <span id={numericId} style={{ position: 'absolute', top: 0 }} aria-hidden="true" />
                <StyledProject id={slug} ref={el => (revealProjects.current[i] = el)}>
                  <div className="project-content">
                    <a href={topLinkHref} className="topLink mobile" target="_blank" rel="noreferrer">
                      <div className="triangle" />
                      {external && !cta && (
                        <div className="external">
                          <Icon name="External" />
                        </div>
                      )}
                    </a>

                    <div>
                      <p className="project-overline">Featured Project</p>
                      <h3 className="project-title">
                        <a href={external} target="_blank" rel="noreferrer">{title}</a>
                      </h3>
                      <div
                        className="project-description"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                      {tech && tech.length > 0 && (
                        <ul className="project-tech-list">
                          {tech.map((t, j) => (
                            <li key={j}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="project-image">
                    <a
                      href={topLinkHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="image-external-link"
                    >
                      {coverVideo ? (
                        <video
                          src={coverVideo}
                          className="img"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: 'var(--border-radius)',
                          }}
                        />
                      ) : (
                        <GatsbyImage image={image} alt={title} className="img" />
                      )}
                    </a>

                    <button
                      type="button"
                      className="image-modal-overlay"
                      onClick={() => openModal(allMedia, modalCopy, modalLinks, title)}
                      aria-label={`Open details for ${title}`}
                    >
                      <span className="modal-hover-content" aria-hidden="true">
                        <span className="modal-hover-icon">🔍</span>
                        <span>View Details</span>
                      </span>
                    </button>

                    <div className="topLink desktop">
                      <div className="triangle" />
                      {external && !cta && (
                        <div className="external">
                          <Icon name="external" />
                        </div>
                      )}
                    </div>
                  </div>
                </StyledProject>
              </React.Fragment>
            );
          })}
        </StyledProjectsGrid>

        {modalOpen && (
          <div
            className="modal-overlay"
            onClick={closeModal}
            role="presentation"
          >
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={modalData.title}
              ref={modalRef}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close details"
              >
                <IconifyIcon icon="fluent:dismiss-12-filled" width="1.2em" height="1.2em" />
              </button>

              {modalData.images.length > 1 ? (
                <Slider
                  dots={false}
                  arrows
                  infinite
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  centerMode
                  centerPadding="0px"
                  nextArrow={<CustomArrow direction="next" />}
                  prevArrow={<CustomArrow direction="prev" />}
                >
                  {modalData.images.map((media, idx) => (
                    <ModalSlide
                      key={idx}
                      media={media}
                      copy={modalData.modalCopy[idx]}
                      links={modalData.modalLinks[idx]}
                      index={idx}
                    />
                  ))}
                </Slider>
              ) : (
                <ModalSlide
                  media={modalData.images[0]}
                  copy={modalData.modalCopy[0]}
                  links={modalData.modalLinks[0]}
                  index={0}
                />
              )}
            </div>
          </div>
        )}
      </StyledShowcaseSection>
    </section>
  );
};

export default Showcase;
