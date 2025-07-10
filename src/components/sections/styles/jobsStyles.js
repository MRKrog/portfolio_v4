import styled from 'styled-components';

export const StyledJobsSection = styled.section`
  max-width: 900px;

  h2 {
    z-index: -1;
    left: 0;
    top: 5rem;
    font-size: clamp(2rem, 28vw, 13rem);
    letter-spacing: -5px;
  }

  .inner {
    display: flex;
    flex-direction: column;
    padding-top: 150px;

    @media (max-width: 600px) {
      display: block;
      padding-top: 110px;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  } 
`;

export const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;

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

export const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-right: 1px solid var(--m-light-black);
  background-color: transparent;
  color: ${({ $isActive }) => ($isActive ? 'var(--m-blue)' : 'var(--m-dim-gray)')};
  font-family: var(--m-font-sub-title);
  font-size: var(--fz-lg);
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  letter-spacing: .1em;

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
    text-align: center;
  }
`;

export const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 0px;
  }
`;

export const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0px;

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

    @media (max-width: 600px) {
      margin-left: 0px;
    }

    h5 {
      margin: 0;
      font-size: 18px;
      padding-top: 15px;
      padding-bottom: 5px;
    }

    ul.skills-list {
      display: grid;
      grid-template-columns: repeat(3, minmax(120px, 200px));
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
          font-size: var(--fz-sm);
          line-height: 12px;
        }
      }
    }

  }
`; 