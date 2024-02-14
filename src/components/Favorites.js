import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  const [highlights, setHighlights] = useState([]);


  useEffect(() => {
    fetchFavoritePlayers();
    fetchFavoriteTeams();
    fetchFavoriteEvents();
    fetchFavoriteLeagues();
    fetchFavoriteHighlights();
  }, []);

  const fetchFavoritePlayers = async () => {
    try {
      const response = await fetch("http://localhost:8001/players");
      const data = await response.json();
      setFavoritePlayers(data);
    } catch (error) {
      console.error('Error fetching favorite players:', error);
    }
  };

  const fetchFavoriteTeams = async () => {
    try {
      const response = await fetch("http://localhost:8001/teams");
      const data = await response.json();
      setFavoriteTeams(data);
    } catch (error) {
      console.error('Error fetching favorite teams:', error);
    }
  };

  const fetchFavoriteEvents = async () => {
    try {
      const response = await fetch("http://localhost:8001/events");
      const data = await response.json();
      setFavoriteEvents(data);
    } catch (error) {
      console.error('Error fetching favorite events:', error);
    }
  };

  const fetchFavoriteLeagues = async () => {
    try {
      const response = await fetch("http://localhost:8001/leagues");
      const data = await response.json();
      setFavoriteLeagues(data);
    } catch (error) {
      console.error('Error fetching favorite leagues:', error);
    }
  };
  const fetchFavoriteHighlights = async () => {
    try {
      const response = await fetch("http://localhost:8001/HighLights");
      const data = await response.json();
      setHighlights(data);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  const removeFavoritePlayer = async (playerId) => {
    try {
      // Perform logic to remove player from favorites
    } catch (error) {
      console.error('Error removing player from favorites:', error);
    }
  };

  const removeFavoriteTeam = async (teamId) => {
    try {
      // Perform logic to remove team from favorites
    } catch (error) {
      console.error('Error removing team from favorites:', error);
    }
  };

  const removeFavoriteEvent = async (eventId) => {
    try {
      // Perform logic to remove event from favorites
    } catch (error) {
      console.error('Error removing event from favorites:', error);
    }
  };

  const removeFavoriteLeague = async (leagueId) => {
    try {
      // Perform logic to remove league from favorites
    } catch (error) {
      console.error('Error removing league from favorites:', error);
    }
  };
  const removeFavoriteHighlight = async (highlightId) => {
    try {
      // Perform logic to remove league from favorites
    } catch (error) {
      console.error('Error removing league from favorites:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Favorite Players</h2>
      {favoritePlayers.map((player, index) => (
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
                <button className="btn btn-danger" onClick={() => removeFavoritePlayer(player.id)}>
                  Remove Favorite
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={player.strThumb}
                alt={`${player.strPlayer} thumbnail`}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="card-footer">
            <small className="text-muted">Description: {player.strDescriptionEN}</small>
          </div>
        </div>
      ))}
      
      <h2>Favorite Teams</h2>
      {favoriteTeams.map((team, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{team.strTeam}</h5>
                <p className="card-text">Sport: {team.strSport}</p>
                <button className="btn btn-danger" onClick={() => removeFavoriteTeam(team.id)}>
                  Remove Favorite
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={team.strTeamBadge}
                alt={`${team.strTeam} badge`}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      ))}

      <h2>Highlights</h2>
      {/* Display highlights */}
      {highlights.map((highlight, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{highlight.highlight.strEvent}</h5>
                <p className="card-text">Sport: {highlight.highlight.strSport}</p>
                <p className="card-text">League: {highlight.highlight.strLeague}</p>
                <p className="card-text">Date: {highlight.highlight.dateEvent}</p>
              </div>
            </div>
            <div className="col-md-4">
              <a 
              href={highlight.highlight.strVideo}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={highlight.highlight.strThumb}
                alt={highlight.highlight.strEvent}
                className="img-fluid rounded-start"
                style={{ width: '100%' }}
              />
              </a>
            </div>
          </div>
          {/* Add button to remove favorite highlight */}
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={() => removeFavoriteHighlight(highlight.id)}
            >
              Remove Favorite
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
