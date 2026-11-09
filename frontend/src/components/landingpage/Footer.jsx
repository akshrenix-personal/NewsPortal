import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaAngleRight,
  FaArrowUp,
} from "react-icons/fa";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";

const SOCIALS = [
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/akshrenix.dev/",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/in/akshrenix/",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    url: "https://www.youtube.com/",
  },
];

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
  { to: "/login", label: "Login" },
  { to: "/UserSignUp", label: "Become a Reporter" },
];

const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

function Footer() {
  return (
    <footer className="pp-footer">
      <div className="container-fluid px-3 px-md-5 pt-5 pb-4">
        <div className="row g-4">
          {/* Brand + about + social */}
          <div className="col-12 col-md-6 col-lg-4">
            <img
              src="/pulsePointLogo.jpeg"
              alt="PulsePoint News"
              className="pp-footer-logo mb-3"
            />
            <p className="pp-footer-text">
              PulsePoint News creates and publishes online news and information
              content that informs, educates, and helps users make better life
              decisions.
            </p>
            <p className="pp-footer-text">
              Our content focuses on relevant and factual information that
              inspires, educates, and entertains readers across the globe.
            </p>
            <div className="pp-footer-social mt-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6>Quick Links</h6>
            <ul className="list-unstyled pp-footer-links mb-0">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} onClick={toTop}>
                    <FaAngleRight size={11} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6>Contact</h6>
            <ul className="list-unstyled pp-footer-contact mb-0">
              <li>
                <MdOutlineMail size={18} />
                <a href="mailto:pulsepoint@gmail.com">pulsepoint@gmail.com</a>
              </li>
              <li>
                <MdOutlineLocationOn size={18} />
                <span>IET Lucknow, Uttar Pradesh , INDIA </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="col-12 col-md-12 col-lg-4">
            <h6>Find Us</h6>
            <iframe
              title="PulsePoint News location"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=iet lucknow&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              className="pp-footer-map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pp-footer-bottom">
        <div className="container-fluid px-3 px-md-5 py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>
            <b>
              {" "}
              © {new Date().getFullYear()} PulsePoint News. All rights reserved.
            </b>
          </span>
          <span>
            Designed &amp; Developed with <span className="pp-heart">❤</span> by{" "}
            <u>
              {" "}
              <i>
                <b className="text-white">Akshrenix.dev</b>
              </i>
            </u>
          </span>
          <button
            type="button"
            className="pp-top-btn"
            onClick={toTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
