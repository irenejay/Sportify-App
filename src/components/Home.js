// Home.jsx
import React from "react";
import Highlights from "./Highlights";
import SearchBar from "./SearchBar";
import LiveScores from "./LiveScores";

const Home = () => {
  return (
    <div>
      
      <div className="header banner"> 
        <div className="container  text-center">
          <SearchBar />
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
