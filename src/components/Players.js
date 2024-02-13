import React, { useState, useEffect } from "react";

export default function Players() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        FetchPlayerDetails();
    }, []);

    const FetchPlayerDetails = async () => {
        const teams = ['Chelsea', 'Barcelona'];

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

            // Flatten the array of arrays into a single array
            const allPlayers = teamPlayers.flat();
            
            setPlayers(allPlayers);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    const player = {
        strPlayer: 'Enzo fernandez',
        strNumber: '8',
        strTeam: 'Arsenal',
        goals: '3'
    }

    const addPlayer = async () => {
        try {
            const response = await fetch('http://localhost:8000/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            })
            if (response.ok) {
                alert('Player added successfully');
            } else {
                console.error('Failed to add player')
            }
        } catch (error) {
            console.error('Failed to add player', error);
        }
        setPlayers(prevPlayers => [...prevPlayers, player])
    }

    return (
        <div>
            <button onClick={addPlayer}>Add Player</button>
            {players.map((player, index) => (
                <div key={index}>
                    <p>Name: {player.strPlayer}</p>
                </div>
            ))}
        </div>
    )
}
