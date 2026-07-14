export default function Navbar() {
    return (
      <aside className="navbar">
        <div className="navbar__brand">
          <p>[Logo]</p>
          <p>App Name</p>
          <p>App Subtitle</p>
        </div>
  
        <nav className="navbar__nav">
          <ul>
            <li>Messages</li>
            <li>Key Exchange</li>
            <li>Analytics</li>
            <li>History</li>
          </ul>
        </nav>
  
        <div className="navbar__footer">
          <div className="navbar__user">
            <p>[Avatar]</p>
            <p>User Name</p>
            <p>Status: Online</p>
          </div>
  
          <div className="navbar__active-key">
            <p>Active Key Panel</p>
            <p>Valid for: --:--</p>
            <p>QBER: --%</p>
          </div>
  
          <button>Logout</button>
        </div>
      </aside>
    );
  }