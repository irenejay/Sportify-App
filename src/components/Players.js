// import React, { useState, useEffect } from "react";

// export default function Players() {
//     const [players, setPlayers] = useState([]);

//     useEffect(() => {
//         FetchPlayerDetails();
//     }, []);

//     const FetchPlayerDetails = async () => {
//         const teams = ['Arsenal'];

//         try {
//             const teamPromises = teams.map(async (team) => {
//                 const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${team}`;
//                 const response = await fetch(url, {
//                     headers: {
//                         'Accept': 'application/json',
//                         'User-agent': 'learning app',
//                     }
//                 });
//                 const data = await response.json();
//                 return data.player;
//             });

//             const teamPlayers = await Promise.all(teamPromises);

//             // Flatten the array of arrays into a single array
//             const allPlayers = teamPlayers.flat();
            
//             setPlayers(allPlayers);
//         } catch (error) {
//             console.error('Error fetching data', error);
//         }
//     }

//     const newPlayer= {
//         strPlayer: '',
//         strNumber: '',
//         strTeam: '',
//         goals: ''
//     }

//     const addPlayer = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/players', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newPlayer)
//             })
//             if (response.ok) {
//                 alert('Player added successfully');
//             } else {
//                 console.error('Failed to add player')
//             }
//         } catch (error) {
//             console.error('Failed to add player', error);
//         }
//         setPlayers(prevPlayers => [...prevPlayers, newPlayer])
//     }

//     return (
//         <div >
//             <button onClick={addPlayer}>Add New Player</button>
//             {players.map((player, index) => (
//                 <div key={index} className="container-sm container-frame" style={{ cursor: 'pointer', marginBottom: '20px',border: '3px solid #008000', width: '50%'}}>
//                     <figure className="figure">
//                     <img src={player.strThumb}alt="Avatar ofplayers"  style={{ width: 100, height: 100 }} />
//                     <p>Name: {player.strPlayer}</p>
//                     <p>Nationality: {player.strNationality}</p>
//                     <p>Description: {player.strDescriptionEN}</p>
//                     <p>Twitter: {player.strTwitter}</p>
                    
//                     </figure>
//                 </div>
//             ))}
//         </div>
//     )
// }
import React, { useState, useEffect } from "react";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [playerForm, setPlayerForm] = useState({
        strPlayer: '',
        strNumber: '',
        strTeam: '',
      strThumb:''

    });

    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    const fetchPlayerDetails = async () => {
        const teams = ['Arsenal'];

        try {
            const teamPromises = teams.map(async (team) => {
                const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${team}`;
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
            
            const allPlayers = teamPlayers.flat();
            
            setPlayers(allPlayers);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const addPlayer = async (event) => {
        event.preventDefault(); 
        try {
            const response = await fetch('http://localhost:8002/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playerForm)
            });
            if (response.ok) {
                const addedPlayer = await response.json();
                setPlayers(prevPlayers => [...prevPlayers, addedPlayer]);
                alert('Player added successfully');
            } else {
                console.error('Failed to add player');
            }
        } catch (error) {
            console.error('Failed to add player', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={addPlayer}>
                <input
                    type="text"
                    name="strPlayer"
                    value={playerForm.strPlayer}
                    onChange={handleInputChange}
                    placeholder="Player Name"
                />
                <input
                    type="text"
                    name="strNumber"
                    value={playerForm.strNumber}
                    onChange={handleInputChange}
                    placeholder="Player Number"
                />
                <input
                    type="text"
                    name="strTeam"
                    value={playerForm.strTeam}
                    onChange={handleInputChange}
                    placeholder="Team"
                />
               <input
    type="url"
    name="strThumb" 
    value={playerForm.strThumb} 
    onChange={handleInputChange}
    placeholder="Image URL"
/>
                <button type="submit">Add Player</button>
            </form>
            {players.map((player, index) => (
                <div key={index} className="container-sm container-frame" style={{ cursor: 'pointer', marginBottom: '20px', border: '3px solid #008000', width: '50%' }}>
                    <figure className="figure">
                        <img src={player.strThumb} alt="Avatar of players" style={{ width: 100, height: 100 }} />
                        <p>Name: {player.strPlayer}</p>
                        <p>Nationality: {player.strNationality}</p>
                        <p>Description: {player.strDescriptionEN}</p>
                        <p>Twitter: {player.strTwitter}</p>
                    </figure>
                </div>
            ))}
        </div>
    );
}