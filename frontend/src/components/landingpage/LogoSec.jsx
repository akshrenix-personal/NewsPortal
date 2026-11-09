import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <header className="pp-masthead" aria-label="PulsePoint News">
      <Link
        to="/"
        className="pp-wordmark-link"
        aria-label="PulsePoint News home"
      >
        <span className="pp-wordmark">
          <span className="pp-pulse">PULSE</span>
          <span className="pp-point">POINT</span>
        </span>
        <span className="pp-news-pill">NEWS</span>
      </Link>

      {/* heartbeat line */}
      <svg
        className="pp-ecg"
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ppEcgGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0b1220" stopOpacity="0" />
            <stop offset="30%" stopColor="#008cff" />
            <stop offset="70%" stopColor="#008cff" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="pp-ecg-line"
          pathLength="700"
          d="M0 22 H215 L232 22 L246 6 L262 36 L277 12 L288 22 H600"
        />
      </svg>

      <div className="pp-tagline">News Beyond Headlines</div>
      <div className="pp-rules" />
    </header>
  );
}
export default Logo;
