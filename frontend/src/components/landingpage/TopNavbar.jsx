import React from "react";
import { MdOutlineMail, MdOutlineCalendarToday } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Edit these links to your own official pages.
const SOCIALS = [
  { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/" },
  { name: "X (Twitter)", icon: <FaXTwitter />, url: "https://x.com/" },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "https://www.instagram.com/akshrenix.dev/",
  },
  { name: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com/" },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/in/akshrenix/",
  },
];

function TopNavbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="topbar">
      <div className="d-flex justify-content-between align-items-center px-3 px-md-5">
        <div className="d-flex align-items-center gap-3">
          <span className="d-none d-md-inline-flex align-items-center gap-1">
            <MdOutlineCalendarToday /> {today}
          </span>
          <a
            href="mailto:pulsepoint@gmail.com"
            className="d-inline-flex align-items-center gap-1"
          >
            <MdOutlineMail size={16} /> pulsepoint@gmail.com
          </a>
        </div>

        <div className="d-flex align-items-center gap-1">
          <span className="d-none d-sm-inline me-2">Follow us</span>
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              className="topbar-icon"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TopNavbar;
