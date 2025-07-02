import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedProfile = localStorage.getItem("profileImage");

    setIsLoggedIn(loggedIn);
    setProfileImage(
      storedProfile ||
        "https://cdn-icons-png.flaticon.com/512/747/747545.png"
    );
  }, []);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: "https://img.icons8.com/?size=100&id=42814&format=png&color=000000", // white home
    },
    {
      name: "Tech News",
      path: "/news",
      icon: "https://img.icons8.com/?size=100&id=42835&format=png&color=000000", 
    },
    {
      name: "Tech Memes",
      path: "/meme",
      icon: "https://img.icons8.com/?size=100&id=b707MDsAkIoy&format=png&color=000000",
    },
    {
      name: "Tech Projects",
      path: "/notes",
      icon: "https://img.icons8.com/?size=100&id=b707MDsAkIoy&format=png&color=000000",
    },
  ];

  const activeStyle = {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1a73e8",
    padding: "10px",
    borderRadius: "12px",
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="TechiSpot Logo"
          className={styles.logoIcon}
        />
        <span className={styles.siteTitle}>TechiSpot</span>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              exact
              to={item.path}
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={item.icon}
                alt={`${item.name} Icon`}
                className={styles.navIcon}
              />
              {item.name}
            </NavLink>
          </li>
        ))}

        <li className={styles.navItem}>
          {isLoggedIn ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className={styles.profilePic}
              />
              <button
                onClick={handleLogout}
                className={styles.navLink}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              exact
              to="/signup"
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
                alt="Sign In Icon"
                className={styles.navIcon}
              />
              Sign In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
