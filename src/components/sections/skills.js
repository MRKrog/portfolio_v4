import React, { useEffect, useRef } from 'react';
import { StyledSkillsSection } from './styles/skillsStyles';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Python']
    },
    {
      title: 'Frameworks',
      skills: ['React', 'Gatsby', 'Node.js', 'React Native', 'Three.js']
    },
    {
      title: 'Platforms',
      skills: ['AWS', 'GitHub', 'Shopify', 'Docker']
    },
    {
      title: 'Specialties',
      skills: ['AR/3D', 'eCommerce', 'UX Design', 'AI Integration']
    }
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="m-section-title">skills</h2>
      
      <div className="inner">
        <div className="skills-grid">
          {skillCategories.map((category, i) => (
            <div key={i} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, j) => (
                  <span key={j} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledSkillsSection>
  );
};

export default Skills; 