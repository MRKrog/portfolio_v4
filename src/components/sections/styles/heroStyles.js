import styled from 'styled-components';

export const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    color: var(--m-black);
    // font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      // margin: 0 0 20px 2px;
    }
  }

  h3 {
    line-height: .95;
    margin: 0;
    font-size: clamp(65px, 8vw, 100px);
    letter-spacing: 0.03em;
    font-family: var(--m-font-title);
    text-align: center;
  }

  h4 {
    font-family: var(--m-font-sub-title);
    color: var(--m-light-black);
    font-size: clamp(30px, 6vw, 28px);
    text-transform: lowercase;
    line-height: 1.1;
    margin: 0;
    font-weight: 200;
    letter-spacing: 4px;
    text-align: center;
  }

  p {
    padding-top: 12px;
    max-width: 750px;
    text-align: center;
    /* font-size: clamp(34px, 6vw, 12); */
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
  
  .hero-cta-buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap;

    .hero-btn {
      ${({ theme }) => theme.mixins.smallButton};
      font-size: var(--fz-xs);
      transition: all 0.3s ease;
      
      &.primary {
        background: var(--m-blue);
        color: white;
        border-color: var(--m-blue);
        
        &:hover {
          background: transparent;
          color: var(--m-blue);
        }
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 148, 224, 0.3);
      }
    }
  }
`;