import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Leagues from "./components/Leagues";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import LeagueDetails from "./components/LeagueDetails";
import TeamDetails from "./components/TeamDetails";
import Favorites from "./components/Favorites";
import Events from "./components/Events";

function App() {
  const [leagues, setLeagues] = useState([]);
  

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    const countries = ['England', 'France', 'Spain', 'Italy', 'Germany'];
    
    try {
      const promises = countries.map(async (country) => {
        const url = `https://www.thesportsdb.com/api/v1/json/60130162/search_all_leagues.php?c=${country}&s=Soccer`;
        const response = await fetch(url, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Don Gitonga",
          },
        });

        const data = await response.json();
        console.log(data)

        if (data.countries) {
          setLeagues((prevLeagues) => [...prevLeagues, ...data.countries]);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Leagues" element={<Leagues leagues={leagues} />} />
        <Route path="/favorites/*" element={<Favorites/>} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Events" element={<Events />}/>
        <Route path="/league/:leagueId" element={<LeagueDetails />} />
        <Route path="/teams/:teamName" element={<TeamDetails />} />

      </Routes>
    </div>
  );
}

export default App;
