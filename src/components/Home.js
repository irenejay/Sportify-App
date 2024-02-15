// Home.jsx
import React from "react";
import Highlights from "./Highlights";
import Events from "./Events";
import SearchBar from "./Search";
import LiveScores from "./LiveScores";

const Home = () => {
  return (
    <div>
      <div className="header">
<<<<<<< HEAD
        <div className="overlay">
          <div className="container d-flex align-items-center justify-content-center h-100">
            <h1 className="mb-4"> FootFlick</h1>
          </div>
=======
        <div className="container text-center">
          <h1 className="mb-4"> FootFlick</h1>
          <SearchBar />
>>>>>>> main
        </div>
      </div>

      {/* Container for the Highlights component */}
      <div className="container mt-5">
        <Highlights />
      </div>

      {/* Container for the Events component */}
      <div className="mt-5">
        <LiveScores />
      </div>
    </div>
  );
};

export default Home;
