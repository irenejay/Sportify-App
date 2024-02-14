// Home.jsx
import React from "react";
import Highlights from "./Highlights";
import Events from "./Events";
import Navbar from "./Navbar";
import Leagues from "./Leagues";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="container text-center">
          <h1 className="mb-4"> FootFlick</h1>
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
      <Leagues/>
    </div>
  );
};

export default Home;
