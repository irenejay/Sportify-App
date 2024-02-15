import React, { useState, useEffect } from "react";

export default function LiveScores() {
  const [liveScores, setLiveScores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.thesportsdb.com/api/v2/json/60130162/livescore.php?s=Soccer';
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.events) {
          setLiveScores(data.events);
        }
      } catch (error) {
        console.error('Error fetching live scores:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLiveScores = liveScores.filter((score) =>
    score.strHomeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    score.strAwayTeam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Live Scores</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a team"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredLiveScores.length === 0 && <p>No live scores available</p>}
      {filteredLiveScores.map((score, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img src={score.strHomeTeamBadge} alt={score.strHomeTeam} style={{ width: '50px' }} />
                <span className="ml-2">{score.strHomeTeam}</span>
              </div>
              <div className="col-md-4 text-center">
                <h3>{score.intHomeScore} - {score.intAwayScore}</h3>
                <p>{score.strProgress}</p>
                <p>{score.strStatus}</p>
                <p>{score.strEventTime}</p>
              </div>
              <div className="col-md-4">
                <img src={score.strAwayTeamBadge} alt={score.strAwayTeam} style={{ width: '50px' }} />
                <span className="ml-2">{score.strAwayTeam}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
