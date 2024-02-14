import React, { useState, useEffect } from "react";

const Teams = ({ leagues }) => {
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, [leagues]);

  const fetchTeams = async () => {
    const teamsPromises = leagues.map(async (league) => {
      const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league.strLeague)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Add league name to the teams data for identification
        const teamsWithLeague = data.teams.map((team) => ({
          ...team,
          leagueName: league.strLeague,
        }));

        // Set the state with teams data
        setTeamsData((prevTeams) => [...prevTeams, ...teamsWithLeague]);
      } catch (error) {
        console.error(`Error fetching teams for ${league.strLeague}:`, error);
      }
    });

    // Wait for all team promises to resolve
    await Promise.all(teamsPromises);
  };

  return (
    <div>
      <h2>Teams</h2>
      {/* Render the teams */}
      <ul>
        {teamsData.map((team) => (
          <li key={team.idTeam}>
            {team.strTeam} - {team.leagueName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
