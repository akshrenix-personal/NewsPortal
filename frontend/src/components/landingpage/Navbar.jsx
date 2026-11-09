import React, { useEffect, useState } from "react";
// import { FaHome, FaRegUser } from "react-icons/fa";
import { FaHome, FaRegUser, FaInfoCircle } from "react-icons/fa";
import {
  IoNewspaper,
  IoLogInSharp,
  IoLogOut,
  IoAddCircleOutline,
} from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoIosContacts, IoIosContact } from "react-icons/io";
import { MdOutlineAppRegistration } from "react-icons/md";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

// One list of links per role - easy to edit in one place.
const GUEST_LINKS = [
  { to: "/", label: "Home", icon: <FaHome />, end: true },
  { to: "/about", label: "About", icon: <FaInfoCircle /> },
  { to: "/gallery", label: "Gallery", icon: <GrGallery /> },
  { to: "/contact", label: "Contact", icon: <IoIosContacts /> },
  { to: "/UserSignUp", label: "Sign Up", icon: <MdOutlineAppRegistration /> },
];

const USER_LINKS = [
  { to: "/user-alllist", label: "All News", icon: <IoNewspaper /> },
  { to: "/user-addnews", label: "Post News", icon: <IoAddCircleOutline /> },
  { to: "/user-list", label: "Your News", icon: <IoNewspaper /> },
  { to: "/user-profile", label: "Profile", icon: <FaRegUser /> },
];

const ADMIN_LINKS = [
  { to: "/admin-newslist", label: "News", icon: <IoNewspaper /> },
  { to: "/admin-ContactUS", label: "Contact Us", icon: <IoIosContact /> },
  { to: "/admin-profile", label: "Profile", icon: <FaRegUser /> },
];

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo"));
  } catch {
    return null;
  }
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo] = useState(readUser);
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const links =
    userInfo?.userType === "admin"
      ? ADMIN_LINKS
      : userInfo?.userType === "user"
        ? USER_LINKS
        : GUEST_LINKS;
  const loggedIn = !!userInfo?.userType;

  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white pp-navbar">
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand" to="/">
          <img
            className="navLogo"
            src="/pulsePointLogo.jpeg"
            alt="PulsePoint News"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`navbar-collapse collapse ${open ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center mb-2 mb-lg-0">
            {links.map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink className="nav-link" to={l.to} end={l.end}>
                  {l.icon}
                  <span>{l.label}</span>
                </NavLink>
              </li>
            ))}

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              {loggedIn ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                  onClick={logOut}
                >
                  <IoLogOut /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-sm btn-login d-inline-flex align-items-center gap-1 px-3"
                >
                  <IoLogInSharp /> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
