import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectValue, setSelectValue] = useState('Select category');
  const [selectOpen, setSelectOpen] = useState(false);

  const projects = [
    {
      id: 1,
      image: "/portfolio/assets/images/project-1.png",
      title: "Food Bot - Ordering Food",
      category: "web development",
      link: "https://food-bot-frontend.onrender.com"
    },
    {
      id: 2,
      image: "/portfolio/assets/images/project-2.png",
      title: "Profile Page",
      category: "web development",
      link: "#about"
    },
    {
      id: 4,
      image: "/portfolio/assets/images/project-3.png",
      title: "Authentication System",
      category: "mobile web applications",
      //link: "#"
    }
  ];

  const filters = ['all', 'web development', 'mobile web applications', 'ai & ml'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <article className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <div className="portfolio-content-wrapper">
        <section className="projects">
          <ul className="filter-list">
            {filters.map(filter => (
              <li className="filter-item" key={filter}>
                <button
                  className={activeFilter === filter ? 'active' : ''}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectValue(filter.charAt(0).toUpperCase() + filter.slice(1));
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <div className="filter-select-box">
            <button 
              className={`filter-select ${selectOpen ? 'active' : ''}`} 
              data-select
              onClick={() => setSelectOpen(!selectOpen)} // Toggle select open state
            >
              <div className="select-value" data-select-value>{selectValue}</div>
              <div className="select-icon">
                <IonIcon name="chevron-down" />
              </div>
            </button>

            <ul className={`select-list ${selectOpen ? 'active' : ''}`}>
              {filters.map(filter => (
                <li className="select-item" key={filter}>
                  <button onClick={() => {
                    setActiveFilter(filter);
                    setSelectValue(filter.charAt(0).toUpperCase() + filter.slice(1));
                    setSelectOpen(false); // Close after selection
                  }}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ul className="project-list">
            {filteredProjects.map(project => (
              <li
                className={`project-item ${project.category === activeFilter || activeFilter === 'all' ? 'active' : ''}`}
                key={project.id}
                data-filter-item
                data-category={project.category}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <figure className="project-img">
                    <div className="project-item-icon-box">
                      <IonIcon icon={eyeOutline} />
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </figure>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default Portfolio;