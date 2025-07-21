import React, { useEffect, useRef, useState } from 'react';
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
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [], modalCopy: [], modalLinks: [] });

  const openModal = (images, modalCopy, modalLinks) => {
    setModalData({ images: images || [], modalCopy: modalCopy || [], modalLinks: modalLinks || [] });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalData({ images: [], modalCopy: [], modalLinks: [] });
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section id="showcase">
      <StyledShowcaseSection>

      <h2 className="m-section-title">showcase</h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const slug = frontmatter.slug || `showcase-${i+1}`;
            const numericId = `showcase-${String(i + 1).padStart(2, '0')}`;
            const { external, title, tech, github, cover, coverVideo, cta, images, videos, videoLinks, modalCopy, modalLinks } = frontmatter;
          
            const image = cover ? getImage(cover) : null;
            
            // Merge all media types into a single array (videos first for stronger impact)
            const allMedia = [
              ...(videos || []),
              ...(videoLinks || []),
              ...(images || [])
            ];

            return (
              <React.Fragment key={i}>
                <span id={numericId} style={{ position: 'absolute', top: 0 }} aria-hidden="true"></span>
                <StyledProject id={slug} ref={el => (revealProjects.current[i] = el)}>
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
                    <a
                      href={external ? external : github ? github : '#'}
                      target='_blank'
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()} // Prevent modal on external link click
                      className="image-external-link"
                    >
                      {/* Use video cover if available, otherwise use image */}
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
                            borderRadius: 'var(--border-radius)'
                          }}
                          onError={(e) => {
                            console.error('Video cover failed to load:', coverVideo);
                          }}
                        />
                      ) : (
                        <GatsbyImage image={image} alt={title} className="img" />
                      )}
                    </a>

                    {/* Overlay div to catch image clicks and open modal */}
                    <div
                      className="image-modal-overlay"
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        cursor: 'zoom-in', 
                        zIndex: 10,
                        background: 'rgba(0, 148, 224, 0)',
                        transition: 'background 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 'var(--border-radius)'
                      }}
                      onClick={() => {

                        openModal(allMedia, modalCopy, modalLinks);
                      }}
                      aria-label={`Open details for ${title}`}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 148, 224, 0.4)';
                        e.target.querySelector('.modal-hover-content').style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 148, 224, 0)';
                        e.target.querySelector('.modal-hover-content').style.opacity = '0';
                      }}
                    >
                      <div 
                        className="modal-hover-content"
                        style={{
                          opacity: '0',
                          transition: 'opacity 0.3s ease',
                          textAlign: 'center',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          pointerEvents: 'none'
                        }}
                      >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                        <div>View Details</div>
                      </div>
                    </div>
                    <div className="topLink desktop">
                      <div className="triangle"></div>
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
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {modalData.images.length > 1 ? (
              <Slider
                {...{
                  dots: false,
                  arrows: true,
                  infinite: true,
                  speed: 700,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: true,
                  centerPadding: '0px',
                  nextArrow: <CustomArrow direction="next" />,
                  prevArrow: <CustomArrow direction="prev" />,
                }}
              >
                
                {modalData.images.map((img, idx) => (
                  <div key={idx}>
                    <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                      
                      {/* Gatsby Image */}
                      {img && img.childImageSharp ? (
                        <GatsbyImage 
                          image={img.childImageSharp.gatsbyImageData} 
                          alt={`Screenshot ${idx + 1}`} 
                          style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
                          imgStyle={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '500px' }}
                        />
                      ) : (() => {
                        // Handle different types of media
                        const mediaUrl = img?.publicURL || img;
                        
                        // Check if it's a YouTube URL
                        // if (typeof mediaUrl === 'string' && isYouTubeUrl(mediaUrl)) {
                        //   const embedUrl = getYouTubeEmbedUrl(mediaUrl);
                        //   return (
                        //     <iframe
                        //       src={embedUrl}
                        //       title={`YouTube video ${idx + 1}`}
                        //       style={{
                        //         width: '100%',
                        //         maxWidth: '800px',
                        //         height: '450px',
                        //         borderRadius: '8px',
                        //         border: 'none',
                        //         display: 'block',
                        //         margin: '0 auto',
                        //         pointerEvents: 'none'
                        //       }}
                        //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        //       allowFullScreen
                        //       frameborder="0" 
                        //     />
                        //   );
                        // }
                        
                        // Check if it's a video file URL
                        if (typeof mediaUrl === 'string' && mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i)) {
                          return (
                            <video 
                              src={mediaUrl} 
                              alt={`Demo video ${idx + 1}`}
                              style={{ 
                                width: '100%', 
                                maxWidth: '800px', 
                                maxHeight: '500px', 
                                borderRadius: '8px', 
                                display: 'block', 
                                margin: '0 auto' 
                              }}
                              autoPlay
                              muted
                              loop
                              playsInline
                              controls={false}
                              onError={(e) => {
                                console.error('Video failed to load:', mediaUrl);
                                e.target.style.display = 'none';
                              }}
                            />
                          );
                        }

                        // Regular image URL
                        return (
                          <img 
                            src={mediaUrl} 
                            alt={`Screenshot ${idx + 1}`} 
                            style={{ 
                              width: '100%', 
                              maxWidth: '800px', 
                              maxHeight: '500px', 
                              objectFit: 'contain', 
                              borderRadius: '8px', 
                              display: 'block', 
                              margin: '0 auto' 
                            }} 
                            onError={(e) => {
                              console.error('Image failed to load:', mediaUrl);
                              e.target.style.display = 'none';
                            }}
                          />
                        );

                      })()}
                      
                      <div className="modal-copy" style={{ margin: '1rem auto 0.5rem auto', color: '#fff', fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
                        {modalData.modalCopy[idx]}
                      </div>
                      
                      {modalData.modalLinks[idx] && modalData.modalLinks[idx] !== 'null' && (
                        <div className="modal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
                          {(() => {
                            try {
                              const links = JSON.parse(modalData.modalLinks[idx]);
                              return links.map((link, linkIdx) => (
                                <a 
                                  key={linkIdx} 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="modal-link-btn"
                                >
                                  {link.label}
                                </a>
                              ));
                            } catch (e) {
                              console.error('Error parsing modal links:', e);
                              return null;
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              </Slider>
            ) : (
              // Single item - render without Slider
              <div style={{ maxWidth: '100%', margin: '0 auto', textAlign: 'center' }}>
                {(() => {
                  const img = modalData.images[0];
                  
                  // Gatsby Image
                  if (img && img.childImageSharp) {
                    return (
                      <>
                        <GatsbyImage 
                          image={img.childImageSharp.gatsbyImageData} 
                          alt="Screenshot" 
                          style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
                          imgStyle={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '500px' }}
                        />
                        <div className="modal-copy" style={{ margin: '1rem auto 0.5rem auto', color: '#fff', fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
                          {modalData.modalCopy[0]}
                        </div>
                        {modalData.modalLinks[0] && modalData.modalLinks[0] !== 'null' && (
                          <div className="modal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
                            {(() => {
                              try {
                                const links = JSON.parse(modalData.modalLinks[0]);
                                return links.map((link, linkIdx) => (
                                  <a 
                                    key={linkIdx} 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="modal-link-btn"
                                  >
                                    {link.label}
                                  </a>
                                ));
                              } catch (e) {
                                console.error('Error parsing modal links:', e);
                                return null;
                              }
                            })()}
                          </div>
                        )}
                      </>
                    );
                  }
                  
                  // Handle different types of media
                  const mediaUrl = img?.publicURL || img;
                  
                  // Check if it's a YouTube URL
                  // if (typeof mediaUrl === 'string' && isYouTubeUrl(mediaUrl)) {
                  //   const embedUrl = getYouTubeEmbedUrl(mediaUrl);
                  //   return (
                  //     <>
                  //       <iframe
                  //         src={embedUrl}
                  //         title="YouTube video"
                  //         style={{
                  //           width: '100%',
                  //           maxWidth: '800px',
                  //           height: '450px',
                  //           borderRadius: '8px',
                  //           border: 'none',
                  //           display: 'block',
                  //           margin: '0 auto',
                  //           pointerEvents: 'none'
                  //         }}
                  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //         allowFullScreen
                  //         frameborder="0" 
                  //       />
                  //       <div className="modal-copy" style={{ margin: '1rem auto 0.5rem auto', color: '#fff', fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
                  //         {modalData.modalCopy[0]}
                  //       </div>
                  //       {modalData.modalLinks[0] && modalData.modalLinks[0] !== 'null' && (
                  //         <div className="modal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
                  //           {(() => {
                  //             try {
                  //               const links = JSON.parse(modalData.modalLinks[0]);
                  //               return links.map((link, linkIdx) => (
                  //                 <a 
                  //                   key={linkIdx} 
                  //                   href={link.url} 
                  //                   target="_blank" 
                  //                   rel="noopener noreferrer" 
                  //                   className="modal-link-btn"
                  //                 >
                  //                   {link.label}
                  //                 </a>
                  //               ));
                  //             } catch (e) {
                  //               console.error('Error parsing modal links:', e);
                  //               return null;
                  //             }
                  //           })()}
                  //         </div>
                  //       )}
                  //     </>
                  //   );
                  // }
                  
                  // Check if it's a video file URL
                  if (typeof mediaUrl === 'string' && mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i)) {
                    return (
                      <>
                        <video 
                          src={mediaUrl} 
                          alt="Demo video"
                          style={{ 
                            width: '100%', 
                            maxWidth: '800px', 
                            maxHeight: '500px', 
                            borderRadius: '8px', 
                            display: 'block', 
                            margin: '0 auto' 
                          }}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={false}
                          onError={(e) => {
                            console.error('Video failed to load:', mediaUrl);
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="modal-copy" style={{ margin: '1rem auto 0.5rem auto', color: '#fff', fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
                          {modalData.modalCopy[0]}
                        </div>
                        {modalData.modalLinks[0] && modalData.modalLinks[0] !== 'null' && (
                          <div className="modal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
                            {(() => {
                              try {
                                const links = JSON.parse(modalData.modalLinks[0]);
                                return links.map((link, linkIdx) => (
                                  <a 
                                    key={linkIdx} 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="modal-link-btn"
                                  >
                                    {link.label}
                                  </a>
                                ));
                              } catch (e) {
                                console.error('Error parsing modal links:', e);
                                return null;
                              }
                            })()}
                          </div>
                        )}
                      </>
                    );
                  }
                  
                  // Regular image URL
                  return (
                    <>
                      <img 
                        src={mediaUrl} 
                        alt="Screenshot" 
                        style={{ 
                          width: '100%', 
                          maxWidth: '800px', 
                          maxHeight: '500px', 
                          objectFit: 'contain', 
                          borderRadius: '8px', 
                          display: 'block', 
                          margin: '0 auto' 
                        }} 
                        onError={(e) => {
                          console.error('Image failed to load:', mediaUrl);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="modal-copy" style={{ margin: '1rem auto 0.5rem auto', color: '#fff', fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
                        {modalData.modalCopy[0]}
                      </div>
                      {modalData.modalLinks[0] && modalData.modalLinks[0] !== 'null' && (
                        <div className="modal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
                          {(() => {
                            try {
                              const links = JSON.parse(modalData.modalLinks[0]);
                              return links.map((link, linkIdx) => (
                                <a 
                                  key={linkIdx} 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="modal-link-btn"
                                >
                                  {link.label}
                                </a>
                              ));
                            } catch (e) {
                              console.error('Error parsing modal links:', e);
                              return null;
                            }
                          })()}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      </StyledShowcaseSection>
    </section>
  );
};

export default Showcase;
