// Home.jsx
import React from "react";
import Highlights from "./Highlights";
import Events from "./Events";

const Home = () => {
  return (
    <div>
      <div className="header">
        <div className="overlay">
          <div className="container d-flex align-items-center justify-content-center h-100">
            <h1 className="mb-4"> FootFlick</h1>
          </div>
        </div>
      </div>

      {/* Container for the Highlights component */}
      <div className="container mt-5">
        <Highlights />
      </div>

      {/* Container for the Events component */}
      <div className="mt-5">
        <Events />
      </div>
    </div>
  );
};

export default Home;
