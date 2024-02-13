import React,{useState, useEffect} from "react";

const Teams = () =>{
    const[Leagues, setLeagues] = useState([]);

    useEffect(() => {
        fetchLeagues();

    }, []);

    const fetchLeagues = async () => {
        try{
            const response = await fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php");
            if(!response.ok){
                throw new Error('Error fetching data:', response.status)
            }
            const data = await response.json();
            setLeagues(data.Leagues);

        }catch(error){
            console.error('Error fetching leagues:', error);

        }

    }










    return(
        <div>
         <h2>List of Leagues</h2>
         {Leagues.map( (league) => (
           <div key={league.idLeague}>
            <h4>{league.strLeague}</h4>
            <h5>{league.strSport}</h5>
            <h6>{league.strLeagueAlternate}</h6>

           </div>
         ))}

        </div>
    );
};

export default Teams;