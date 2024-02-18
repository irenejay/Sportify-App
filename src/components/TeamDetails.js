import React from "react";
import { useParams } from "react-router-dom";
import Players from "./Players";

const TeamDetails = () => {
  const { teamName } = useParams();
  
  return (
    <div>
      <h1>{teamName}</h1>
      
      <Players team={teamName} />

    </div>
  );
};

export default TeamDetails;
