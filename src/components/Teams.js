import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Teams = ({ leagueName }) => {
  const [allTeams, setAllTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(8);

  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    fetchTeams();
  }, [leagueName]);

  const handleButtonClick = (selectedTeam) => {
    const teamName = encodeURIComponent(selectedTeam.strTeam);
    navigate(`/teams/${teamName}`);
  };

  const fetchTeams = async () => {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/60130162/search_all_teams.php?l=${encodeURIComponent(leagueName)}`;
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Your User Agent",
        },
      });

      const data = await response.json();

      if (data.teams) {
        setAllTeams(data.teams);
      }
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

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filterTeams(allTeams, searchTerm).slice(
    indexOfFirstTeam,
    indexOfLastTeam
  );

  const totalPages = Math.ceil(filterTeams(allTeams, searchTerm).length / teamsPerPage);

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
          <div key={team.idTeam} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={team.strTeamBadge}
                className="card-img-top"
                alt={team.strTeam}
              />
              <div className="card-body">
                <h5 className="card-title">{team.strTeam}</h5>
                <p className="card-text">Sport: {team.strSport}</p>
                <button className="btn btn-primary" onClick={() => handleButtonClick(team)}>
                  Get Information
                </button>
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