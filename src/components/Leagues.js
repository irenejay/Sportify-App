import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Pagination from "./Pagination";

export default function Leagues({ leagues }) {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leaguesPerPage] = useState(8);

  const navigate = useNavigate(); // Get the navigation function
  

  useEffect(() => {
    // If you want to fetch data when the leagues prop changes, add your fetch logic here
  }, [leagues]);

  const toggleDescription = (league) => {
    setSelectedLeague(league);
  };

  const handleButtonClick = () => {
    // Check if selectedLeague is not null before accessing its properties
    if (selectedLeague && selectedLeague.strLeague) {
      // Instead of calling getInformation directly, navigate to the league details page
      const leagueName = encodeURIComponent(selectedLeague.strLeague);
      console.log('This is the league name'+ leagueName)
      navigate(`/leagues/${selectedLeague}`);
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSelectedLeague(null); // Reset selectedLeague when searching
  };

  const filterLeagues = (leagues, searchTerm) => {
    return leagues.filter((league) =>
      league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const indexOfLastLeague = currentPage * leaguesPerPage;
  const indexOfFirstLeague = indexOfLastLeague - leaguesPerPage;
  const currentLeagues = filterLeagues(leagues, searchTerm).slice(
    indexOfFirstLeague,
    indexOfLastLeague
  );

  const totalPages = Math.ceil(filterLeagues(leagues, searchTerm).length / leaguesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Football Leagues</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a league"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {currentLeagues.map((league) => (
          league.strLogo && (
            <div key={league.idLeague} className="col-md-3 mb-3">
              <div className="card h-100">
                <img
                  src={league.strBadge}
                  className="card-img-top"
                  alt={league.strLeague}
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    onClick={() => toggleDescription(league)}
                    style={{ cursor: "pointer" }}
                  >
                    {league.strLeague}
                  </h5>
                  <p className="card-text">Country: {league.strCountry}</p>
                  <p className="card-text">
                    <a href={`http://${league.strWebsite}`} target="_blank" rel="noopener noreferrer">Website</a>
                  </p>
                  {/* Bootstrap Button */}
                  <Link to={`/league/${encodeURIComponent(league.strLeague)}`}>
                    <button className="btn btn-primary" onClick={handleButtonClick}>
                      Get Information
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
}
