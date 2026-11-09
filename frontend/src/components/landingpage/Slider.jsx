import axios from "../../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// slide1.jpeg ... slide6.jpeg in the /public folder
const SLIDES = Array.from({ length: 6 }, (_, i) => `/slide${i + 1}.jpeg`);
const SLIDE_MS = 3000;

function Slid() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-play is handled in React (Bootstrap's data-bs-ride only starts on
  // window "load", which never fires for components rendered by a SPA route).
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  const fetchData = async () => {
    try {
      const response = await axios.get("/top-ten-news");
      if (response?.data?.code == 200) {
        setData(response?.data?.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="row slider">
        <div className="col-sm-8 p-1 ">
          <div
            className="carousel ps-3 slide"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="carousel-inner rounded-2 fade-slider">
              {SLIDES.map((src, i) => (
                <div
                  key={src}
                  className={`fade-slide ${i === current ? "active" : ""}`}
                >
                  <img
                    src={src}
                    className="d-block w-100 sliderimg"
                    alt={`Slide ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="carousel-indicators">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === current ? "active" : ""}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={prev}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={next}
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-sm-4 py-2 headmarquee">
          <h3 className="text-center bg-light">
            Top 10 News <b className="text-color">Headline</b>
          </h3>
          <marquee direction="up" className="headline" behavior="alternate">
            {data?.map((item) => {
              return (
                <div
                  key={item?._id}
                  onClick={() => {
                    localStorage.setItem("newsDetails", JSON.stringify(item));
                    navigate("/news-details");
                  }}
                  className="card mb-3 mx-auto shadow-lg border border-0"
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      {item?.type == "image" ? (
                        <img
                          src={item?.url}
                          className="img-fluid rounded-start headlineimg"
                          alt="..."
                        />
                      ) : (
                        <iframe
                          width={100}
                          height={100}
                          src={item?.url}
                          title="Video player"
                          frameBorder={0}
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-1">
                        <p className="card-text mx-2 m-0">
                          <b>{item?.title}</b>
                          <br />
                          <span>{item?.desc?.slice(0, 10)}...</span>
                        </p>
                        <p className="m-0">
                          <a className="btn bg-color button ms-2 text-light">
                            View More{" "}
                          </a>
                        </p>

                        <p className="card-text">
                          <small className="text-muted mx-2">
                            {new Date(item?.createAt)?.toDateString()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {data?.length == 0 && (
              <h3 className="text-center">No Record Found</h3>
            )}
          </marquee>
        </div>
      </div>
    </>
  );
}
export default Slid;
