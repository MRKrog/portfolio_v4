import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
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
    left: 0;
    font-size: 12rem;
    letter-spacing: -2px;
    left: 50%;
    /* top: 50%; */
    transform: translate(-50%, -50%);

    /* top: -3rem; */
    /* z-index: -1; */
    /* left: 0; */
    /* font-size: 12rem; */
    /* font-size: clamp(40px, 5vw, 60px); */
    /* 
    Minimum size: This is the smallest size the output can be. In your case, it's 40px. No matter how small the viewport is, the font-size will not go below 40px.
    Preferred size: This is the size that CSS will attempt to use under ideal conditions. In your case, it's 5vw, which is 5% of the viewport width. As the viewport width changes, so will the font-size.
    Maximum size: This is the largest size the output can be. In your case, it's 60px. No matter how large the viewport is, the font-size will not exceed 60px.
    So, in your case, font-size: clamp(40px, 5vw, 60px); means that the font size will be at least 40px, at most 60px, and ideally 5vw. This allows for a responsive font size that adjusts with the viewport width, but within a controlled range. 
    */
    letter-spacing: -2px;
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .contact-copy {
    width: 100%;
    display: flex;
    justify-content: space-around;

    p {
      text-align: left;
      max-width: 600px;
      margin-bottom: 1em;  
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    /* margin-top: 50px; */
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
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      {/* <h2 className="numbered-heading overline">What’s Next?</h2> */}

      <h2 className="m-section-title">contact</h2>

      <div className="contact-copy">
        <p>
          Feel free to drop me a message. 
          Whether you have a question or just want to say hi, I’m always happy to connect!
        </p>
      </div>

      <div>
        <ContactForm />
      </div>

      {/* <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a> */}
    </StyledContactSection>
  );
};

export default Contact;
