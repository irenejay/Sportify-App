import React, { useState, useEffect, useCallback } from 'react';

const Events = () => {
  const [events, setEvents] = useState([
    {
      idEvent: 1,
      strEvent: "Arsenal vs Chelsea",
      dateEvent: "2023-05-02",
      strVenue: "Emirates Stadium",
      strThumb: "https://www.thesportsdb.com/images/media/event/thumb/wy5re41689062588.jpg",
      strYoutube: null, 
    },
    {
      idEvent: 2,
      strEvent: "Arsenal vs Chelsea",
      dateEvent: "2024-02-15",
      strVenue: "Emirates Stadium",
      strThumb: "https://www.thesportsdb.com/images/media/event/thumb/p3uy2m1659642411.jpg",
      strYoutube: "VIDEO_ID", 
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('');

  const fetchEvents = useCallback(async () => {
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
  }, [eventName]);

  const handleSearch = () => {
    if (eventName.trim() !== '') {
      fetchEvents();
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="container">
      
      <h1 className="mt-4 mb-4">Event</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event.idEvent} className="col-md-4 mb-4">
              <div className="card">
                {event.strYoutube ? (
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      src={`https://www.youtube.com/embed/${event.strYoutube}`}
                      allowFullScreen
                      title={event.strEvent}
                      className="embed-responsive-item"
                    ></iframe>
                  </div>
                ) : (
                  <img src={event.strThumb} className="card-img-top" alt={event.strEvent} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.strEvent}</h5>
                  <p className="card-text">Date: {event.dateEvent}</p>
                  <p className="card-text">Venue: {event.strVenue}</p>
                  {event.strYoutube && (
                    <div>
                      <p className="card-text">
                        <a href={`https://www.youtube.com/watch?v=${event.strYoutube}`} target="_blank" rel="noopener noreferrer">
                          Watch on YouTube
                        </a>
                      </p>
                      
                      <p className="card-text">Additional details about the event...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
