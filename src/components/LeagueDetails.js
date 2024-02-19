import React, { useEffect, useState, useCallback } from "react";
import Teams from "./Teams";
import { useParams } from "react-router-dom";

const LeagueDetails = () => {
  const [leagueTable, setLeagueTable] = useState([]);
  const [showTable, setShowTable] = useState(true); // Initially show the table
  const [tableError, setTableError] = useState(false); // State for handling errors
  const { leagueId } = useParams();
  console.log(leagueId);

  const getLeagueTable = useCallback(async () => {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/60130162/lookuptable.php?l=${leagueId}&s=2023-2024`;
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Your User Agent",
        },
      });
      const data = await response.json();
      console.log(data);

      if (data.table) {
        setLeagueTable(data.table);
      } else {
        console.error("No league table data found");
        setTableError(true);
      }
    } catch (error) {
      console.error("Error fetching league table:", error);
      setTableError(true);
    }
  }, [leagueId]);

  useEffect(() => {
    getLeagueTable();
  }, [getLeagueTable]);

  const handleToggle = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 mb-3 text-center">
          {/* Bootstrap toggle button */}
          <button className="btn btn-primary" onClick={handleToggle}>
            {showTable ? "Show Football Teams" : "Show League Table"}
          </button>
        </div>
      </div>
      {tableError && (
        <div className="row">
          <div className="container mt-4">
            <h1 style={{ textAlign: "center" }}>
              No league table data available. This is either a cup competition or the API doesn't have table data.
            </h1>
          </div>
        </div>
      )}
      {showTable && (
        <div className="row">
          <div className="container mt-4">
            <h1 style={{ textAlign: "center" }}>League Table</h1>
            {/* Bootstrap table for leagueTable */}
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Badge</th>
                  <th>Rank</th>
                  <th>Form</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Draws</th>
                  <th>Goals For</th>
                  <th>Goals Against</th>
                  <th>Goal Difference</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leagueTable.map((team) => (
                  <tr key={team.idTeam}>
                    <td>{team.strTeam}</td>
                    <td>
                      <img
                        src={team.strTeamBadge}
                        alt={team.strTeam}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </td>
                    <td>{team.intRank}</td>
                    <td>{team.strForm}</td>
                    <td>{team.intWin}</td>
                    <td>{team.intLoss}</td>
                    <td>{team.intDraw}</td>
                    <td>{team.intGoalsFor}</td>
                    <td>{team.intGoalsAgainst}</td>
                    <td>{team.intGoalDifference}</td>
                    <td>{team.intPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!showTable && (
        <div className="row">
          <div className="col-md-12">
            {/* Only display football teams */}
            <Teams leagueId={leagueId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueDetails;
