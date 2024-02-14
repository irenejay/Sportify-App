import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Highlights = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    const url = `https://www.thesportsdb.com/api/v1/json/60130162/eventshighlights.php?s=Soccer`;

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Don Gitonga',
        },
      });

      const data = await response.json();

      const modifiedHighlights = data.tvhighlights
        .filter((highlight) => highlight.strThumb)
        .map((highlight) => ({
          ...highlight,
          strThumb: highlight.strThumb,
        }));

      setHighlights(modifiedHighlights);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of visible slides as needed
    slidesToScroll: 1,
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recent Match Highlights</h2>
      <Slider {...sliderSettings}>
        {highlights.map((highlight) => (
          <div key={highlight.idEvent} className="mb-4">
            <div className="card">
              {highlight.strThumb && (
                <a
                  href={highlight.strVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={highlight.strThumb}
                    className="card-img-top"
                    alt="Thumbnail"
                  />
                </a>
              )}
              <div className="card-body">
                <h5 className="card-title">{highlight.strEvent}</h5>
                <p className="card-text">League: {highlight.strLeague}</p>
                <p className="card-text">Date: {highlight.dateEvent}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Highlights;
