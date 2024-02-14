import React, { useState, useEffect } from "react";
import Pagination from "./Pagination"; // Adjust the path based on your project structure

const Players = ({ team }) => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(5); // Adjust the number of players per page as needed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlayerDetails();
  }, [team, searchTerm]); // Include searchTerm in the dependency array to re-fetch when the search term changes

  const fetchPlayerDetails = async () => {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/60130162/searchplayers.php?t=${team}&p=${searchTerm}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-agent': 'learning app',
        }
      });
      const data = await response.json();
  
      if (data.player) {
        // Filter players based on strSport === 'Soccer'
        const soccerPlayers = data.player.filter(player => player.strSport === 'Soccer' && player.strGender==='Male');
        
        setPlayers(soccerPlayers);
      } else {
        console.error('No player data found for the team:', team);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when the search term changes
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for players"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {currentPlayers.map((player, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Name: {player.strPlayer}</h5>
                <p className="card-text">
                  Facebook: <a href={player.strFacebook} target="_blank" rel="noopener noreferrer">{player.strFacebook}</a>
                </p>
                <p className="card-text">
                  Twitter: <a href={player.strTwitter} target="_blank" rel="noopener noreferrer">{player.strTwitter}</a>
                </p>
                <p className="card-text">Role: {player.strPosition}</p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={player.strThumb}
                alt={`${player.strPlayer} thumbnail`}
                className="img-fluid rounded-start"
                style={{ width: '75%' }}
              />
            </div>
          </div>
          <div className="card-footer">
            <small className="text-muted">Description: {player.strDescriptionEN}</small>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(players.length / playersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Players;
