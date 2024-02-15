import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";



export default function Players() {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [playersPerPage] = useState(12);

  

  useEffect(() => {
    FetchPlayerDetails();
  }, []);

  const FetchPlayerDetails = async () => {
    const teams = ['Arsenal','Barcelona','Dortmund','Monaco'];

    try {
      const teamPromises = teams.map(async (team) => {
        const url = `https://www.thesportsdb.com/api/v1/json/60130162/searchplayers.php?t=${team}`;
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-agent': 'learning app',
          },
        });
        const data = await response.json();
        return data.player;
      });

      const teamPlayers = await Promise.all(teamPromises);

      const allPlayers = teamPlayers.flat().map(player => ({ ...player, favoriteCount: 0 }));

      setPlayers(allPlayers);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

 


  const handleFavourite = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.idPlayer === playerId) {
          return { ...player, favoriteCount: player.favoriteCount + 1 };
        }
        return player;
      })
    );
  };

  const pageCount = Math.ceil(players.length / playersPerPage);

  const currentPlayers = players.slice(
    currentPage * playersPerPage,
    (currentPage + 1) * playersPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  function changeBackground(e) {
    e.target.style.background = 'red';
    e.target.style.cursor = 'pointer';
  }

  function changeColorOnLeave(e) {
    e.target.style.background = 'green';
    e.target.style.cursor = 'pointer';
  }

  return (
    <div className="container mt-5">
     
      <h2 className="mb-3" style={{ fontFamily: 'Times New Roman Times serif' }}>
        Players Details
      </h2>
      <div className="row">
        {currentPlayers.map((player) => (
          <div
            key={player.idPlayer}
            className="col-md-3 mb-3 mr-3"
            style={{ cursor: 'pointer', paddingRight: '2%' }}
          >
            <figure className="figure">
              <img
                src={player.strThumb}
                alt="Avatar of players"
                style={{ width: '100%', height: 'auto' }}
              />
              <p className="card-text">
                <strong>Name:</strong> {player.strPlayer}
              </p>
              <p className="card-text">
                <strong>Nationality:</strong> {player.strNationality}
              </p>
              <p className="card-text">
                <strong>Description: </strong>
                {player.strSigning}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {player.strStatus}
              </p>
              <button
                onMouseLeave={changeColorOnLeave}
                onMouseOver={changeBackground}
                onClick={() => handleFavourite(player.idPlayer)}
                className="btn btn-info"
                style={{ cursor: 'pointer' }}
              >
                Favourites ❤️{player.favoriteCount}
              </button>
            </figure>
          </div>
        ))}
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
        />
      </div>
      <div className="container mt-5">
        <h2 className="mb-4">Players Details</h2>
        <div className="row"></div>
        <div className="row mt-4">
          <div className="col-6">
            {currentPage > 0 && (
              <button
                className="btn btn-info"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            )}
          </div>
          <div className="col-6 text-right">
            {currentPage < Math.ceil(players.length / playersPerPage) - 1 && (
              <button
                className="btn btn-dark"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}