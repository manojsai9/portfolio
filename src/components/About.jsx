import { IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';

const About = ({ openModal }) => {
  const testimonials = [
    {
      id: 1,
      avatar: "/portfolio/assets/images/avatar-1.png",
      name: "Coding Philosophy",
      points: [
        "Clean and maintainable code,",
        "Continuous learning and improvement,",
        "Building with scalability in mind" 
      ]
    },
    
    {
      id: 2,
      avatar: "/portfolio/assets/images/avatar-2.png",
      name: "Future Goals",
      points: [
        "Building impactful web applications,",
        "Machine learning and AI,",
        "Open-source contributions"
      ]
    }
  ];

  const services = [
    {
      title: "Web development",
      text: "I build full-stack web applications that are responsive, dynamic, and easy to use."
    },
    {
      title: "Web design",
      text: "A clean, modern, and user-friendly design approach focused on simplicity and usability."
    },
  ];

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>
          A self-taught programmer with a passion for software development.
        </p>
        <p>
          I'm passionate about building web applications and software that is not only functional but also intuitive and user-friendly. I believe in continuous learning and staying updated with the latest technologies.
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What i do</h3>
        <ul className="service-list">
          {services.map((service, index) => (
            <li className="service-item" key={index}>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="testimonials">
        <h3 className="h3 testimonials-title">How I Think</h3>
        <ul className="testimonials-list has-scrollbar">
          {testimonials.map((testimonial) => (
            <li className="testimonials-item" key={testimonial.id}>
              <div className="content-card" onClick={() => openModal(testimonial)}>
                <figure className="testimonials-avatar-box">
                  <img src={testimonial.avatar} alt={testimonial.name} width="60" />
                </figure>
                <h4 className="h4 testimonials-item-title">{testimonial.name}</h4>
                <div className="testimonials-text">
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {testimonial.points.map((point, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="clients">
        <h3 className="h3 clients-title">Tech stack</h3>
        <div className="clients-scroll-container">
          <ul className="clients-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <li className="clients-item" key={i}>
                <div className="tech-logo-container">
                  <img 
                    src={`/portfolio/assets/images/logo-${i}-color.png`} 
                    alt="tech logo" 
                    className="tech-logo"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};

export default About;