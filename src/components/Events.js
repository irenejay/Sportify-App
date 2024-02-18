import React, { useEffect, useState, useCallback } from "react";
import Pagination from "./Pagination";
import { useNavigate} from "react-router-dom";

function Events() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(8); 
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const navigate = useNavigate();

  const fetchCurrentEvents = useCallback(async () => {
    const date = getDate();
    const url = `https://www.thesportsdb.com/api/v1/json/60130162/eventstv.php?d=${date}&s=Soccer`;

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Don Gitonga",
        },
      });
      const data = await response.json();

      setCurrentEvents(data.tvevents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },[]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchCurrentEvents();
    fetchFavoriteEvents();

  }, [fetchCurrentEvents]); // Fetch new events when currentPage changes

  

  const getDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const onButtonClick = async (event) => {
    // Check if the event is already a favorite
    const isFavorite = favoriteEvents.some(
      (favorite) => favorite.idEvent === event.idEvent
    );

    if (isFavorite) {
      alert("This event is already a favorite.");
      return; // Do not add the event again if it's already a favorite
    }

    try {
      const response = await fetch('http://localhost:8001/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        alert('Event added to favorites:', event);
        navigate('/favorites/events')
        // Optionally, you can update the list of favorite events
        setFavoriteEvents([...favoriteEvents, event]);
        // You can add some feedback to the user if needed
      } else {
        console.error('Failed to add event to favorites');
        // You can handle error feedback here if needed
      }
    } catch (error) {
      console.error('Error adding event to favorites:', error);
      // You can handle error feedback here if needed
    }
  };

  const fetchFavoriteEvents = async () => {
    // Fetch the list of favorite events when the component mounts
    try {
      const response = await fetch("http://localhost:8001/events");
      if (response.ok) {
        const data = await response.json();
        setFavoriteEvents(data);
      } else {
        console.error("Failed to fetch favorite events.");
      }
    } catch (error) {
      console.error("Error fetching favorite events:", error);
    }
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const filteredEvents = currentEvents.filter(event =>
    event.strEvent.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentEventsPage = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Today's TV Events</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for an event"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped hover">
        <thead>
          <tr>
            <th>Event</th>
            <th>Time</th>
            <th>Channel</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEventsPage.map((event) => (
            <tr key={event.id}>
              <td>{event.strEvent}</td>
              <td>{event.strTime}</td>
              <td>{event.strChannel}</td>
              <td>{event.strCountry}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onButtonClick(event)}>
                  Add Favorite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
}

export default Events;
