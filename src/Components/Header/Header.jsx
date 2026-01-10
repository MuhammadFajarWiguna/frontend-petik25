import "./Header.css";
function Header() {
  return (
    <nav className="nav">
      <div className="nav-left">
      <div className="logo"><img src="" alt="" /></div>
      <span className="logo-text">Kursus Hifive</span>
      </div>
      
      <div className="nav-right">
      <ul className="nav-menu">
        <li>Home</li>
        <li>About</li>
        <li>Login</li>
      </ul>
      <button className="nav-btn"> Sign in</button>
      </div>
    </nav>
  );
}

export default Header;