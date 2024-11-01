import React, { useEffect, useState } from "react";
import EventTable from "./components/events/EventTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api/events");
      const data = await response.json();
      setEvents(data.events);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <EventTable events={events} />
    </div>
    
  );
};

export default App;
