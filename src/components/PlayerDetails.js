import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import '../styles/index.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const PlayerDetails = () => {
    const { playerName } = useParams();
    const [playerDetails, setPlayerDetails] = useState({});

    const getPlayerInfo = useCallback(async () => {
        try {
            const url = `https://www.thesportsdb.com/api/v1/json/60130162/searchplayers.php?p=${playerName}`;
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Your User Agent",
                },
            });
            const data = await response.json();

            console.log(`This is player data: ${data}`);
            
            // Check if the data has players and strSport is "Soccer"
            if (data.player && data.player[0].strSport === "Soccer") {
                setPlayerDetails(data.player[0]);
            } else {
                console.error('No soccer player info found');
                setPlayerDetails({}); // Clear playerDetails if not a soccer player
            }
        } catch (error) {
            console.error('Error fetching player info:', error);
        }
    }, [playerName]);

    useEffect(() => {
        getPlayerInfo();
    }, [getPlayerInfo]);

    return (
        <div className="container">
            <div className="player-info">
                <div className="player-description" style={{ textAlign: "center" }}>
                    {/* Render player details only if strSport is "Soccer" */}
                    {playerDetails.strSport === "Soccer" ? (
                        <>
                            <h1>{playerName}</h1>
                            <img
                                src={playerDetails.strThumb}
                                alt="Player Thumbnail"
                                className="rounded-thumbnail text"
                            />
                            <p>Team: {playerDetails.strTeam}</p>
                            <p>Date of Birth: {playerDetails.dateBorn}</p>
                            <p>Position: {playerDetails.strPosition}</p>
                            <p>description: {playerDetails.strDescriptionEN}</p>
                            <p>Signing fee: {playerDetails.strSigning}</p>
                            <div className="social-media-icons">
                            {/* Small social media icons */}
                            <p>
                                <FaFacebook />
                                <a href={playerDetails.strFacebook} target="_blank" rel="noopener noreferrer">
                                    {playerDetails.strFacebook}
                                </a>
                            </p>
                            <p>
                                <FaTwitter />
                                <a href={playerDetails.strTwitter} target="_blank" rel="noopener noreferrer">
                                    {playerDetails.strTwitter}
                                </a>
                            </p>
                            <p>
                                <FaInstagram />
                                <a href={playerDetails.strInstagram} target="_blank" rel="noopener noreferrer">
                                    {playerDetails.strInstagram}
                                </a>
                            </p>
                        </div>
                            {/* Add other player details as needed */}
                        </>
                    ) : (
                        // Display a message if not a soccer player
                        <p>This player is not associated with soccer.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerDetails;
