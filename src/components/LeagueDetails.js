import React from "react";
import Teams from "./Teams";
import { useParams } from "react-router-dom";

const LeagueDetails = () => {
  const {leagueId} = useParams();
  console.log(leagueId)
  return (
    <div>
      {/* Add additional information or fetch more details as needed */}
      <Teams leagueId={leagueId} />
    </div>
  );
};

export default LeagueDetails;
