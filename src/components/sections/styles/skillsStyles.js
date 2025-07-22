import styled from 'styled-components';

export const StyledSkillsSection = styled.section`
  max-width: 900px;
  margin: 0 auto 100px;

  h2 {
    padding-top: 0px;
    z-index: -1;
    left: 0;
    top: 7rem;
    font-size: clamp(2rem, 28vw, 10rem);
    letter-spacing: -5px;
  }

  .inner {
    display: flex;
    flex-direction: column;
    padding-top: 150px;

    @media (max-width: 600px) {
      padding-top: 110px;
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .skill-category {
    text-align: center;
  }

  .category-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--m-blue);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .skill-item {
    color: var(--m-light-black);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    padding: 2px 0;
    
    &:hover {
      color: var(--m-blue);
    }
  }
`; 