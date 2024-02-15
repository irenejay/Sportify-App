import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Pagination from "./Pagination";
import LeagueDetails from "./LeagueDetails";

export default function Leagues({ leagues }) {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  const [leaguesPerPage] = useState(8);

  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    const fetchFavoriteLeagues = async () => {
      try {
        const response = await fetch("http://localhost:8001/leagues");
        if (response.ok) {
          const data = await response.json();
          setFavoriteLeagues(data);
        } else {
          console.error("Failed to fetch favorite leagues.");
        }
      } catch (error) {
        console.error("Error fetching favorite leagues:", error);
      }
    };

    fetchFavoriteLeagues();
  }, [leagues]);

  const handleGetInformation = (league) => {
    setSelectedLeague(league);
  };

  const handleAddFavorite = (league) => {
    addFavoriteLeague(league);
  }

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

  const addFavoriteLeague = async (league) => {
    if (league && league.strLeague) {
      // Check if the league is already a favorite
      const isFavorite = favoriteLeagues.some(
        (favorite) => favorite.idLeague === league.idLeague
      );

      if (isFavorite) {
        alert("This league is already a favorite.");
        return; // Do not add the league again if it's already a favorite
      }

      try {
        const response = await fetch("http://localhost:8001/leagues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(league),
        });

        if (response.ok) {
          console.log("League added to favorites successfully!");
          // Optionally, you can navigate or perform any action after successful addition
          // Update the list of favorite leagues
          setFavoriteLeagues([...favoriteLeagues, league]);
        } else {
          console.error("Failed to add league to favorites.");
        }
      } catch (error) {
        console.error("Error adding league to favorites:", error);
      }
    }
  };

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
                  <h5 className="card-title">{league.strLeague}</h5>
                  <p className="card-text">Country: {league.strCountry}</p>
                  <p className="card-text">
                    <a href={`http://${league.strWebsite}`} target="_blank" rel="noopener noreferrer">Website</a>
                  </p>
                  {/* Bootstrap Button */}
                  <Link to={`/league/${encodeURIComponent(league.idLeague)}`}>
                    <button className="btn btn-primary mt-2" onClick={() => handleGetInformation(league)}>
                      Get Information
                    </button>
                  </Link>
                  <br></br>
                  <button className="btn btn-primary mt-2" onClick={() => handleAddFavorite(league)}>
                    Add Favorite
                  </button>
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
      {selectedLeague && (
        <>
          {console.log(`selected league is ${selectedLeague}`)}
          <LeagueDetails
            id={selectedLeague.idLeague}
            leagueName={selectedLeague.strLeague}
          />
        </>
      )}
    </div>
  );
}
