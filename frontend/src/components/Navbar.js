import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="ByteWise Logo"
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "10%",
            objectFit: "cover",
            marginRight: "10px"
          }}
        />
        <h2 style={styles.logo}>ByteWise</h2>
      </div>

      <div style={styles.links}>
        <Link style={getLinkStyle(location.pathname === "/")} to="/">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link style={getLinkStyle(location.pathname === "/login")} to="/login">Login</Link>
            <Link style={getLinkStyle(location.pathname === "/register")} to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link style={getLinkStyle(location.pathname === "/profile")} to="/profile">
              {user?.email || "Profile"}
            </Link>
            <Link style={getLinkStyle(location.pathname === "/create")} to="/create">Create Lesson</Link>
            <Link style={getLinkStyle(location.pathname === "/create-folder")} to="/create-folder">Create Folder</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#282c34",
    color: "white"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  logoutBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "1em"
  }
};

const getLinkStyle = (isActive) => ({
  color: isActive ? "#61dafb" : "#fff",
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal"
});

export default Navbar;
