import React, { useState, useEffect } from "react";

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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recent Match Highlights</h2>
      <div className="row">
        {highlights.map((highlight) => (
          <div key={highlight.idEvent} className="col-md-4 mb-4">
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
      </div>
    </div>
  );
};

export default Highlights;
