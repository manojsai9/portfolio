import { IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';

const Resume = () => {
  const education = [
    {
      title: "SRM University",
      period: "2020 — 2024",
      description: "Bachelor's degree in electronics and communication engineering."
    },
    // Add other education items
  ];

  const experience = [
    {
      title: "Digitide - Data Engineering Intern",
      period: "April 2025 — Present",
      description: "Designing and optimizing ETL pipelines for AI/ML workflows under DAAI Team & Learning industry-standard tools (e.g., Apache Airflow, Spark, SQL)"
    },
    {
      title: "Slash Mark - Full Stack Developer",
      period: "Jan 2025 — April 2025",
      description: "Worked as a Full Stack Developer at Slash Mark, building and maintaining full-stack web applications using the MERN stack, including user authentication, API integration, and database management."
    },
    // Add other experience items
  ];

  const skills = [
    { name: "DSA", percentage: 40 },
    { name: "MERN Stack", percentage: 80 },
    { name: "Web design", percentage: 60 },
  ];

  return (
    <article className="resume" data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experience.map((item, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span className="timeline-period">{item.period}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {education.map((item, index) => (
            <li className="timeline-item" key={index}>
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <span className="timeline-period">{item.period}</span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My Skills</h3>

        {/* frontend Skills */}
        <div className="skills-group">
          <h4 className="h4 skills-subtitle">Frontend Web Technologies</h4>
          <ul className="skills-tag-list">
            {['Python', 'JavaScript', 'React.js', 'React Native', 'HTML5', 'CSS3', 'Material UI'].map((skill, index) => (
              <li key={index} className="skill-tag">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Backend Skills */}
        <div className="skills-group">
          <h4 className="h4 skills-subtitle">Backend Technologies</h4>
          <ul className="skills-tag-list">
            {['Django', 'Express.js', 'Node.js', 'Mongoose'].map((skill, index) => (
              <li key={index} className="skill-tag">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Database Skills */}
        <div className="skills-group">
          <h4 className="h4 skills-subtitle">Databases</h4>
          <ul className="skills-tag-list">
            {['MySQL', 'MongoDB'].map((skill, index) => (
              <li key={index} className="skill-tag">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Proficiency Skills */}
        <div className="skills-group">
          <h4 className="h4 skills-subtitle">Proficiency</h4>
          <ul className="skills-list content-card">
            {skills.map((skill, index) => (
              <li className="skills-item" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.percentage}%</span>
                </div>
                <div className="skill-progress-bg">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};

export default Resume;