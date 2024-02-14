import React, { useState, useEffect } from "react";

export default function Leagues() {
  const [allLeagues, setAllLeagues] = useState([]);

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
        console.log(data.countries)

        if (data.countries) {
          setAllLeagues((prevLeagues) => [...prevLeagues, ...data.countries]);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  return (
    <div>
      <h2>Football Leagues</h2>
      <ul>
        {allLeagues.map((league) => (
          <li key={league.idLeague}>{league.strLeague}</li>
        ))}
      </ul>
    </div>
  );
}
