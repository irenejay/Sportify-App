import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/index.css'

const PlayerDetails = () => {
    const { playerName } = useParams();
    const [playerDetails, setPlayerDetails] = useState({});
    const [playerId, setPlayerId] = useState("");

    useEffect(() => {
        getPlayerInfo();
    }, []);

    const getPlayerInfo = async () => {
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
            if (data.player) {
                setPlayerId(data.player.idPlayer);
                setPlayerDetails(data.player[0]);
            }
        } catch (error) {
            console.error('No player info found');
        }
    }

    return (
        <div className="container">
            <div className="player-info">
                
                <div className="player-description" style={{textAlign: "center"}}>
                
                    <h1>{playerName}</h1>
                    <img
                    src={playerDetails.strThumb}
                    alt="Player Thumbnail"
                    className="rounded-thumbnail text"
                />
                    <p>Team: {playerDetails.strTeam}</p>
                    <p>Sport: {playerDetails.strSport}</p>
                    <p>Date of Birth: {playerDetails.dateBorn}</p>
                    <p>Date Signed: {playerDetails.dateSigned}</p>
                    <p>Signing: {playerDetails.strSigning}</p>
                    <p>Wage: {playerDetails.strWage}</p>
                    <p>Description: {playerDetails.strDescriptionEN}</p>
                    <p>
                        Facebook:{" "}
                        <a href={playerDetails.strFacebook} target="_blank" rel="noopener noreferrer">
                            {playerDetails.strFacebook}
                        </a>
                    </p>
                    <p>
                        Twitter:{" "}
                        <a href={playerDetails.strTwitter} target="_blank" rel="noopener noreferrer">
                            {playerDetails.strTwitter}
                        </a>
                    </p>
                    <p>
                        Instagram:{" "}
                        <a href={playerDetails.strInstagram} target="_blank" rel="noopener noreferrer">
                            {playerDetails.strInstagram}
                        </a>
                    </p>
                    <p>Height: {playerDetails.strHeight}</p>
                    <p>Weight: {playerDetails.strWeight}</p>
                </div>
            </div>
        </div>
    );
}

export default PlayerDetails;
