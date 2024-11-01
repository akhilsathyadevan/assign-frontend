import React, { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import CreateEvent from "./CreateEvent"; 

const EventTable = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const eventsPerPage = 5;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleCreateButtonClick = () => setShowCreateModal(true);
  const closeModal = () => setShowCreateModal(false);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Event List</h3>
        <Button variant="primary" onClick={handleCreateButtonClick}>
          Create Event
        </Button>
      </div>
      
      <Table striped bordered hover responsive className="table-sm text-center">
        <thead className="table-dark">
          <tr>
            <th>Event Name</th>
            <th>Start Date</th>
            <th>Frequency</th>
            <th>Next Occurrence</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{new Date(event.startDate).toLocaleString()}</td>
              <td>{event.frequency.charAt(0).toUpperCase() + event.frequency.slice(1)}</td>
              <td>{new Date(event.nextOccurrence).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {showCreateModal && <CreateEvent onClose={closeModal} />}
    </div>
  );
};

export default EventTable;
