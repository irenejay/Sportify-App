import React, { useState } from 'react';

const Events= () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${eventName}`);
      const data = await response.json();
      setEvents(data.event || []); 
    } catch (error) {
      console.error('Error searching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (eventName.trim() !== '') {
      fetchEvents();
    }
  };

  return (
    <div>
      <h1>Event</h1>
      <div>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.idEvent}>
              <p>{event.strEvent}</p>
              <p>Date: {event.dateEvent}</p>
              <p>Venue: {event.strVenue}</p>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
