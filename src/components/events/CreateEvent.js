import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import {createEvents} from '../../apis/events'
const CreateEvent = ({ onClose }) => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [frequency, setFrequency] = useState("");
  const [customFrequency, setCustomFrequency] = useState("");
  const [exclusionDates, setExclusionDates] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!eventName) newErrors.eventName = "Event name is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!frequency) newErrors.frequency = "Frequency is required";
    if (frequency === "Custom" && !customFrequency) {
      newErrors.customFrequency = "Custom frequency pattern is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const eventData = {
      eventName,
      startDate,
      frequency,
      customFrequency: frequency === "Custom" ? customFrequency : null,
      exclusionDates,
    };

    try {
      const response = await createEvents(eventData)
      console.log(response);
      
      if (response.id) {
        toast.success("Event created successfully!");
        onClose();
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the event.");
    }
  };

  const handleAddExclusionDate = (date) => {
    setExclusionDates([...exclusionDates, date]);
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        
          <Form.Group controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              isInvalid={!!errors.eventName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.eventName}
            </Form.Control.Feedback>
          </Form.Group>

         
          <Form.Group controlId="startDate">
            <Form.Label className="p-3">Start Date and Time</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="form-control mt-2"
            />
            <Form.Control.Feedback type="invalid">
              {errors.startDate}
            </Form.Control.Feedback>
          </Form.Group>

      
          <Form.Group controlId="frequency">
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              as="select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              isInvalid={!!errors.frequency}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Custom">Custom</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.frequency}
            </Form.Control.Feedback>
          </Form.Group>

  
          {frequency === "Custom" && (
            <Form.Group controlId="customFrequency">
              <Form.Label>Custom Frequency Pattern</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Every 2 days, Every 1st of the month"
                value={customFrequency}
                onChange={(e) => setCustomFrequency(e.target.value)}
                isInvalid={!!errors.customFrequency}
              />
              <Form.Control.Feedback type="invalid">
                {errors.customFrequency}
              </Form.Control.Feedback>
            </Form.Group>
          )}

        
          <Form.Group controlId="exclusionDates">
            <Form.Label className="p-3">Exclusion Dates</Form.Label>
            <DatePicker
              selected={null}
              onChange={(date) => handleAddExclusionDate(date)}
              placeholderText="Select exclusion dates"
              className="form-control mt-2"
              isClearable
            />
            <div className="mt-2">
              {exclusionDates.map((date, index) => (
                <div key={index}>{date.toDateString()}</div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEvent;
