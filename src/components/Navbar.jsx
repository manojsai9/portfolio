const Navbar = ({ activePage, setActivePage, toggleTheme, isDarkMode }) => {
  const pages = ['about', 'resume', 'portfolio', 'contact'];
  
  return (
    <nav className="navbar-glass" data-navbar>
      <div className="navbar-container">
        <ul className="navbar-list">
          {pages.map(page => (
            <li className="navbar-item" key={page}>
              <button 
                className={`navbar-link ${activePage === page ? 'active' : ''}`}
                onClick={() => setActivePage(page)}
              >
                <span className="nav-text">{page.charAt(0).toUpperCase() + page.slice(1)}</span>
              </button>
            </li>
          ))}
          <li className="navbar-item">
            <button 
              className="navbar-link theme-toggle"
              onClick={toggleTheme}
            >
              <span className="nav-text">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;