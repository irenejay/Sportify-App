import React from "react";
import { useParams } from "react-router-dom";
import Players from "./Players";

const TeamDetails = () => {
  const { teamName } = useParams();

  return (
    <div>
      <h1>{teamName}</h1>
      {/* Add additional information or fetch more details as needed */}
      {/* You can fetch additional details about the team here */}
      <Players team={teamName} />

    </div>
  );
};

export default TeamDetails;
