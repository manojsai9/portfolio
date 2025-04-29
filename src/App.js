import { useState, useEffect } from 'react';
import './App.css';
import './styles/main.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [sidebarActive, setSidebarActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const openModal = (data) => {
    setModalData(data);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About openModal={openModal} />;
      case 'resume':
        return <Resume />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <About openModal={openModal} />;
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="content-wrapper">
        <Sidebar
          active={sidebarActive}
          toggleSidebar={toggleSidebar}
        />

        <div className="main-content-container">
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />

          <div className="page-content">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;