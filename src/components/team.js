import React, { useState } from 'react';

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
      showVideo:true,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [newEvent, setNewEvent] = useState({
    idEvent: '', 
    strEvent: '',
    dateEvent: '',
    strVenue: '',
    strThumb: '',
    strYoutube: '',
    showVideo: false, 
  });

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

  const addEvent = async (event) => {
    try {
      const response = await fetch('http://localhost:8000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      if (response.ok) {
        alert('Event added successfully');
        setEvents(prevEvents => [...prevEvents, event]);
        setNewEvent({
          idEvent: '',
          strEvent: '',
          dateEvent: '',
          strVenue: '',
          strThumb: '',
          strYoutube: '',
          showVideo: false,
        });
        setShowForm(false);
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Failed to add event', error);
    }
  };

  const handleAddEvent = () => {
    setShowForm(true); 
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addEvent(newEvent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  return (
    <div className="container" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFmSmPJY4_6JtadkjJvB1Ee2EsT0dTzOFFA&usqp=CAU')` }}>
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
      <button className="btn btn-success mb-4" onClick={handleAddEvent}>Add Event</button>
      {showForm && (
    <form onSubmit={handleFormSubmit}>
        <div className="form-group">
            <label>Event Name</label>
            <input
                type="text"
                className="form-control"
                name="strEvent"
                value={newEvent.strEvent}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label>Date</label>
            <input
                type="date"
                className="form-control"
                name="dateEvent"
                value={newEvent.dateEvent}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label>Venue</label>
            <input
                type="text"
                className="form-control"
                name="strVenue"
                value={newEvent.strVenue}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="form-group">
            <label>Thumbnail URL (optional)</label>
            <input
                type="url"
                className="form-control"
                name="strThumb"
                value={newEvent.strThumb}
                onChange={handleInputChange}
            />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
)}
      
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event.idEvent} className="col-md-4 mb-4">
              <div className="card">
                {event.strThumb && (
                  <img src={event.strThumb} className="card-img-top" alt={event.strEvent} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.strEvent}</h5>
                  <p className="card-text">Date: {event.dateEvent}</p>
                  <p className="card-text">Venue: {event.strVenue}</p>
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
