import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { ContactForm } from '@components';

const StyledContactSection = styled.section`
  max-width: 900px;
  margin: 0 auto 100px;
  text-align: center;

  h2 {
    top: 3rem;
    z-index: -1;
    font-size: clamp(2rem, 24vw, 12rem);
    letter-spacing: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .contact-copy {
    width: 100%;
    display: flex;
    justify-content: space-around;

    p {
      text-align: center;
      max-width: 600px;
      margin-bottom: 1em;  
      font-size: 18px;
      
      @media (max-width: 768px) {
        max-width: 500px;
      }
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>

      <h2 className="m-section-title">Contact</h2>

      <div className="contact-copy">
        <p>
          Feel free to drop me a message. 
          Whether you have a question or just want to say hi, I’m always happy to connect!
        </p>
      </div>

      <div>
        <ContactForm />
      </div>

    </StyledContactSection>
  );
};

export default Contact;
