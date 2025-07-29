import styled from 'styled-components';

export const StyledAboutSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 100px;
  position: relative;

  .name-gradient {
    background: linear-gradient(135deg, #0088CC 0%, #00d1ff 50%, #0088CC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  h2 {
    z-index: -1;
    top: 2rem;
    right: 0;
    font-size: clamp(2rem, 30vw, 14rem);
    letter-spacing: -5px;
    opacity: 0.03;
  }

  .inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    position: relative;
    z-index: 2;
    align-items: center;

    @media (max-width: 768px) {
      display: block;
      grid-gap: 40px;
    }
  }

  .about-content {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #0088CC, #00d1ff);
      border-radius: 50%;
      opacity: 0.1;
      z-index: -1;
    }
  }

  .about-header {
    margin-bottom: 30px;
    position: relative;
  }

  .about-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 15px 0;
    letter-spacing: -0.02em;
    position: relative;
    
    br {
      display: none;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }

  .about-subtitle {
    margin: 0;
    color: var(--m-blue);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
  }

  .about-copy {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--m-light-black);
    margin: 0 0 20px 0;
    
    &:last-of-type {
      margin-bottom: 0;
    }
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .about-highlight {
    background: linear-gradient(120deg, rgba(0, 136, 204, 0.1) 0%, rgba(0, 209, 255, 0.1) 100%);
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid var(--m-blue);
    margin: 25px 0;
    
    .highlight-title {
      font-weight: 600;
      color: var(--m-blue);
      margin: 0 0 10px 0;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .highlight-text {
      margin: 0;
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

export const StyledPic = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin: 40px auto 0;
    width: 100%;
  }

  .wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 
      0 20px 40px rgba(0, 136, 204, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    /* &:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 25px 50px rgba(0, 136, 204, 0.2),
        0 12px 24px rgba(0, 0, 0, 0.15);
    } */

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 136, 204, 0.1), rgba(0, 209, 255, 0.1));
      z-index: 1;
      pointer-events: none;
    }

    .img {
      position: relative;
      width: 100%;
      height: auto;
      border-radius: 20px;
      filter: grayscale(30%) contrast(1.1);
      transition: filter 0.3s ease;
      z-index: 2;
      
      /* &:hover {
        filter: grayscale(0%) contrast(1.2);
      } */
    }
  }

  .image-decoration {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid var(--m-blue);
    border-radius: 50%;
    opacity: 0.3;
    z-index: -1;
    
    &.bottom-right {
      bottom: -20px;
      right: -20px;
    }
  }
`;

export const StyledText = styled.div`
  position: relative;
  z-index: 10;
`; 