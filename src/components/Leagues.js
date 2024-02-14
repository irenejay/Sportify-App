import React, { useState, useEffect } from "react";

export default function Leagues() {
  const [allLeagues, setAllLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leaguesPerPage] = useState(9); 

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    const countries = ['England', 'France', 'Spain', 'Italy', 'Germany'];

    try {
      const promises = countries.map(async (country) => {
        const url = `https://www.thesportsdb.com/api/v1/json/60130162/search_all_leagues.php?c=${country}&s=Soccer`;
        const response = await fetch(url, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Don Gitonga",
          },
        });

        const data = await response.json();

        if (data.countries) {
          setAllLeagues((prevLeagues) => [...prevLeagues, ...data.countries]);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  const toggleDescription = (league) => {
    setSelectedLeague(league);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filtered leagues based on search term
  const filteredLeagues = allLeagues.filter((league) =>
    league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastLeague = currentPage * leaguesPerPage;
  const indexOfFirstLeague = indexOfLastLeague - leaguesPerPage;
  const currentLeagues = filteredLeagues.slice(
    indexOfFirstLeague,
    indexOfLastLeague
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Football Leagues</h2>
      {/* Search Bar */}
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
          // Add a condition to check if strLogo is not null before rendering the card
          league.strLogo && (
            <div key={league.idLeague} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={league.strLogo}
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
                  {selectedLeague === league && (
                    <p className="card-text">{league.strDescriptionEN}</p>
                  )}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      {/* Pagination Buttons */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: Math.ceil(filteredLeagues.length / leaguesPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
