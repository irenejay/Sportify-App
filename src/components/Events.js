import React, { useEffect, useState } from "react";

function Events() {
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchCurrentEvents();
  }, []); // Empty dependency array to run the effect only once

  const fetchCurrentEvents = async () => {
    const date = getDate();
    const location = getLocation();
    const url = `https://www.thesportsdb.com/api/v1/json/60130162/eventstv.php?d=${date}&s=Soccer`;

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Don Gitonga",
        },
      });
      const data = await response.json();

      // Check if the location data is available, otherwise default to South Africa
      const filteredEvents = data.tvevents.filter(
        (event) =>
          event.strCountry === location || event.strCountry === "South Africa"
      );

      setCurrentEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  const getDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const getLocation = () => {
    const userLocale = navigator.language || "en-US";
    const countryName = new Intl.DisplayNames([userLocale], {
      type: "region",
    }).of("001");

    console.log(countryName);
    return countryName;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Current TV Events Based On your location</h2>
      <table className="table table-striped hover">
        <thead>
          <tr>
            <th>Event</th>
            <th>Time</th>
            <th>Channel</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event.idEvent}>
              <td>{event.strEvent}</td>
              <td>{event.strTime}</td>
              <td>{event.strChannel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
