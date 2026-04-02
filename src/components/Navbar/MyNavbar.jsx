import profile from "../../assets/petik.jpeg"
import "./MyNavbar.css"


const MyNavbar = ({ search, setSearch }) => {
  return (
    <div className="navbar">
      <div className="search-wrapper">
        <input
          className="search-box"
          type="text"
          placeholder=" Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="profile">
        <img
          src={profile}
          alt="profile"
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default MyNavbar;