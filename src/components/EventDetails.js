import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventName } = useParams();
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const url = `https://www.thesportsdb.com/api/v1/json/60130162/searchevents.php?e=${eventName}`;
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "User-Agent": "Your User Agent",
          },
        });
        const data = await response.json();
        console.log("Event Details:", data);
        if (data.event) {
          // Sort the events by dateEvent in ascending order
          const sortedEvents = data.event.sort((a, b) => {
            const dateA = new Date(a.dateEvent);
            const dateB = new Date(b.dateEvent);
            return dateA - dateB;
          });

          setEventDetails(sortedEvents);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventName]);

  return (
    <div className="container mt-4">
      <h2>Event Details for {eventName}</h2>
      <div className="row">
        {eventDetails.map((event, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <span className="ml-2">{event.strHomeTeam}</span>
                </div>
                <div className="col-md-4 text-center">
                  <h3>{event.intHomeScore} - {event.intAwayScore}</h3>
                  <p>{event.strProgress}</p>
                  <p>{event.strVenue}</p>
                  <p>{event.dateEvent}</p>
                </div>
                <div className="col-md-4">
                  <span className="ml-2">{event.strAwayTeam}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
