import React, { useState, useEffect } from "react";


export default function Players() {
    const [players, setPlayers] = useState([]);
    
    

    useEffect(() => {
        FetchPlayerDetails();
    }, []);

    const FetchPlayerDetails = async () => {
        const teams = ['Arsenal','Barcelona','Dortmund','Monaco','Napoli'];

        try {
            const teamPromises = teams.map(async (team) => {
                const url = `https://www.thesportsdb.com/api/v1/json/60130162/searchplayers.php?t=${team}`;
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'User-agent': 'learning app',
                    }
                });
                const data = await response.json();
                return data.player;
            });

            const teamPlayers = await Promise.all(teamPromises);

            // Flatten the array of arrays into a single array 
            // initializes the favourite count to zero
            const allPlayers = teamPlayers.flat().map(player => ({ ...player, favoriteCount: 0 }));

            setPlayers(allPlayers);
            
            
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    // const newPlayer= {
    //     strPlayer: '',
    //     strNumber: '',
    //     strThumb: '',
    //     strNationality: '',
    //     strDescriptionEN:"",
    //     strStatus:''
    // }

    // const addPlayer = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8001/players', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newPlayer)
    //         })
    //         if (response.ok) {
    //             alert('Player added successfully');
    //         } else {
    //             console.error('Failed to add player')
    //         }
    //     } catch (error) {
    //         console.error('Failed to add player', error);
    //     }
    //     setPlayers(prevPlayers => [...prevPlayers, newPlayer])
    // }
    
    //  updates the favourite count by one of each player 
    const handleFavourite = (index) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[index].favoriteCount += 1;
            return updatedPlayers;
        });
    }
    function changeBackground(e) {
        e.target.style.background = 'red';
        e.target.style.cursor  = ' pointer'
      }
      function changeColorOnLeave(e){
        e.target.style.background = 'green';
        e.target.style.cursor  = ' pointer'
      }
    return (
        <div >
            <button >Add New Player</button>
            {players.map((player, index) => (
                <div key={index} className="container-sm container-frame" style={{ cursor: 'pointer', marginBottom: '20px',border: '3px solid #008000', width: '50%'}}>
                    <figure className="figure">
                    <img src={player.strThumb}alt="Avatar ofplayers"  style={{ width: 100, height: 100 }} />
                    <p><strong>Name:</strong> {player.strPlayer}</p>
                    <p><strong>Nationality:</strong> {player.strNationality}</p>
                    <p><strong>Description: </strong>{player.strDescriptionEN}</p>
                    <p ><strong>Status:</strong> {player.strStatus}</p>
     
 

                    <button onMouseLeave={changeColorOnLeave}  onMouseOver ={changeBackground}onClick={() => handleFavourite(index)} className= 'btn btn-info'style={{ cursor: 'pointer' }}>
                            Favourites ❤️{player.favoriteCount}
                        </button>
                    
                    </figure>
                </div>
            ))}
        </div>
    )
}
