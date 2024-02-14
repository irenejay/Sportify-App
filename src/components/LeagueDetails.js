// LeagueDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import Teams from "./Teams";

const LeagueDetails = () => {
  const { leagueName } = useParams();
  console.log(leagueName)
  return (
    <div>
      <h1>{leagueName}</h1>
      {/* Add additional information or fetch more details as needed */}
      <Teams leagueName={leagueName}/>
    </div>
  );
};

export default LeagueDetails;
