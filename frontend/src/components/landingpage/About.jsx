import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoShieldCheckmarkSharp,
  IoLocationSharp,
  IoVideocamSharp,
  IoPeopleSharp,
} from "react-icons/io5";
import Navbar from "./Navbar";

const VALUES = [
  {
    icon: <IoShieldCheckmarkSharp size={34} />,
    title: "Verified Before Published",
    text: "Every story submitted to PulsePoint News is reviewed by our editorial admin. Only approved stories reach the public pages.",
  },
  {
    icon: <IoLocationSharp size={34} />,
    title: "Local to National",
    text: "We organise stories by category and by city, so readers can follow what matters to their neighbourhood as well as the country.",
  },
  {
    icon: <IoVideocamSharp size={34} />,
    title: "Pictures & Video",
    text: "News is more than text. Contributors can publish photo stories and video reports that bring events to life.",
  },
  {
    icon: <IoPeopleSharp size={34} />,
    title: "Community Reporters",
    text: "Anyone can register, post a story and become a citizen reporter, giving a voice to people and places that are often missed.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "Register",
    text: "Create a free reporter account in a minute.",
  },
  {
    no: "02",
    title: "Submit",
    text: "Post your story with a title, category, city, description and an image or video link.",
  },
  {
    no: "03",
    title: "Editorial Review",
    text: "Our admin checks the story for accuracy and quality.",
  },
  {
    no: "04",
    title: "Published",
    text: "Approved stories go live on the home page and the news sections.",
  },
];

const PRINCIPLES = [
  "Accuracy first",
  "Independence",
  "Fairness & balance",
  "Accountability",
  "Respect for privacy",
];

const About = () => {
  const location = useLocation();

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

      {/* Hero */}
      <section className="text-center py-5 px-3 bg-light border-bottom">
        <p
          className="text-uppercase text-muted mb-1 small"
          style={{ letterSpacing: "3px" }}
        >
          About Us
        </p>
        <h1 className="fw-bold">
          PULSEPOINT <span className="text-color">News</span>
        </h1>
        <p
          className="fs-5 text-muted mx-auto mb-0"
          style={{ maxWidth: "720px" }}
        >
          Timely, trustworthy and community-driven news, from your city to the
          world.
        </p>
      </section>

      <div className="container-fluid px-3 px-md-5">
        {/* Who we are */}
        <section
          className="row align-items-center py-5 mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold mb-3">
              Who <span className="text-color">We Are</span>
            </h2>
            <p>
              PulsePoint News is an online news platform built to keep readers
              informed about the stories that shape their lives: politics,
              business, sports, technology, education and city life.
            </p>
            <p>
              We combine a professional editorial review process with
              contributions from the community, so reporting stays close to the
              ground while remaining reliable. Every story on the site is
              checked before it is published.
            </p>
            <p className="mb-0">
              Our goal is simple: make accurate news easy to find, easy to read
              and open to everyone.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/mass-media.jpeg"
              alt="Newsroom"
              className="img-fluid rounded shadow w-100"
              style={{ maxHeight: "320px", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          className="row g-4 pb-5 mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <div className="col-md-6">
            <div
              className="h-100 p-4 border rounded shadow-sm border-top border-4"
              style={{ borderTopColor: "#008cff" }}
            >
              <h4 className="fw-bold">
                Our <span className="text-color">Mission</span>
              </h4>
              <p className="mb-0">
                To deliver fast, fact-checked and fair news, and to give every
                community a platform to share its stories responsibly.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="h-100 p-4 border rounded shadow-sm border-top border-4"
              style={{ borderTopColor: "#008cff" }}
            >
              <h4 className="fw-bold">
                Our <span className="text-color">Vision</span>
              </h4>
              <p className="mb-0">
                To become a trusted digital newsroom where readers find reliable
                information and citizen reporters find a voice.
              </p>
            </div>
          </div>
        </section>

        <hr />

        {/* What we offer */}
        <section className="py-5 mx-auto" style={{ maxWidth: "1100px" }}>
          <h2 className="fw-bold text-center mb-4">
            What <span className="text-color">We Offer</span>
          </h2>
          <div className="row g-4">
            {VALUES.map((v) => (
              <div className="col-sm-6 col-lg-3" key={v.title}>
                <div className="h-100 text-center p-4 border rounded shadow-sm">
                  <div className="text-color mb-2">{v.icon}</div>
                  <h6 className="fw-bold">{v.title}</h6>
                  <p className="small text-muted mb-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-5 mx-auto" style={{ maxWidth: "1100px" }}>
          <h2 className="fw-bold text-center mb-4">
            How a Story <span className="text-color">Gets Published</span>
          </h2>
          <div className="row g-4">
            {STEPS.map((s) => (
              <div className="col-sm-6 col-lg-3" key={s.no}>
                <div className="d-flex">
                  <div
                    className="fs-1 fw-bold text-color me-3"
                    style={{ lineHeight: 1 }}
                  >
                    {s.no}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{s.title}</h6>
                    <p className="small text-muted mb-0">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial principles */}
        <section
          className="py-4 mx-auto text-center"
          style={{ maxWidth: "1100px" }}
        >
          <h2 className="fw-bold mb-3">
            Our Editorial <span className="text-color">Principles</span>
          </h2>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {PRINCIPLES.map((p) => (
              <span
                key={p}
                className="badge rounded-pill bg-color fs-6 fw-normal px-3 py-2"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section
          className="my-5 mx-auto rounded text-center text-white p-5"
          style={{ maxWidth: "1100px", background: "#008cff" }}
        >
          <h3 className="fw-bold">Have a story to share?</h3>
          <p className="mb-4">
            Join PulsePoint News as a community reporter and let your city be
            heard.
          </p>
          <Link to="/UserSignUp" className="btn btn-light me-2">
            Become a Reporter
          </Link>
          <Link to="/contact" className="btn btn-outline-light">
            Contact Us
          </Link>
        </section>
      </div>
    </>
  );
};

export default About;
