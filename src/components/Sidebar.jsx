import { IonIcon } from '@ionic/react';
import { mailOutline, phonePortraitOutline, calendarOutline, locationOutline, logoFacebook, logoTwitter, logoInstagram, chevronDown, logoLinkedin, logoGithub } from 'ionicons/icons';
import { useState, useEffect } from 'react';

const Sidebar = ({ active, toggleSidebar }) => {
  const [showSecondAvatar, setShowSecondAvatar] = useState(false);

  useEffect(() => {
    // Show second avatar after component mounts
    const timer = setTimeout(() => {
      setShowSecondAvatar(true);
    }, 500); // Start flip after 0.5s

    // Hide second avatar after animation completes
    const resetTimer = setTimeout(() => {
      setShowSecondAvatar(false);
    }, 2000); // Complete animation after 2s

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <aside className={`sidebar ${active ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <div className={`avatar-flip-container ${showSecondAvatar ? 'flipped' : ''}`}>
            <img
              src="/portfolio/assets/images/my-avatar.png"
              alt="Manoj sai"
              width="200"
              className="avatar-front"
            />
            <img
              src="/portfolio/assets/images/my-avatar1.png"
              alt="Manoj sai"
              width="200"
              className="avatar-back"
            />
          </div>
        </figure>

        <div className="info-content">
          <h1 className="name" title="Manoj sai">Manoj sai</h1>
          <p className="title">Full stack web developer</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn onClick={toggleSidebar}>
          <span>Show Contacts</span>
          <IonIcon icon={chevronDown} />
        </button>
      </div>


      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={mailOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a
                href="mailto:manojsaei9@gmail.com"
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                manojsaei9@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={locationOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Bangalore, India</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/manojsai9/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonIcon icon={logoLinkedin} />
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://github.com/manojsai9"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonIcon icon={logoGithub} />
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://x.com/manojsaei"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonIcon icon={logoTwitter} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;