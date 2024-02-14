import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Teams = ({ leagues }) => {
  const [allTeams, setAllTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(9);

  // Define the countries array
  const countries = ['England', 'France', 'Spain', 'Italy', 'Germany'];

  useEffect(() => {
    fetchTeams();
  }, [leagues]);

  const fetchTeams = async () => {
    try {
      const promises = leagues.map(async (league) => {
        const url = `https://www.thesportsdb.com/api/v1/json/60130162/search_all_teams.php?l=${encodeURIComponent(league.strLeague)}`;
        const response = await fetch(url, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Your User Agent",
          },
        });

        const data = await response.json();
        console.log("Teams Data:", data);

        if (data.teams) {
          // Filter teams by countries with case-insensitive and partial matching
          const teamsFromSelectedCountries = data.teams.filter(team =>
            countries.some(country => team.strCountry.toLowerCase().includes(country.toLowerCase()))
          );

          setAllTeams((prevTeams) => [...prevTeams, ...teamsFromSelectedCountries]);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filterTeams = (teams, searchTerm) => {
    return teams.filter((team) =>
      team.strTeam.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortTeamsByCountry = (teams) => {
    return teams.sort((a, b) => a.strCountry.localeCompare(b.strCountry));
  };

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = sortTeamsByCountry(filterTeams(allTeams, searchTerm)).slice(
    indexOfFirstTeam,
    indexOfLastTeam
  );

  const totalPages = Math.ceil(sortTeamsByCountry(filterTeams(allTeams, searchTerm)).length / teamsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Football Teams</h2>
      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a team"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {currentTeams.map((team) => (
          <div key={team.idTeam} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={team.strTeamBadge}
                className="card-img-top"
                alt={team.strTeam}
              />
              <div className="card-body">
                <h5 className="card-title">{team.strTeam}</h5>
                <p className="card-text">Sport: {team.strSport}</p>
                <p className="card-text">Country: {team.strCountry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Teams;
