import axios from "axios";

const BASE_API_URL = "http://localhost:3000/api";

export const getEvents = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/events`);
    return data;
  } catch (error) {
    console.error(`Error fetching events: ${error.message}`);
    return null; // Return null if error occurs
  }
};

export const createEvent = async (event) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/create`, event);
    return data;
  } catch (error) {
    console.error(`Error creating event: ${error.message}`);
    return null; // Return null if error occurs
  }
};

export const updateEvent = async (id, event) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/update/${id}`, event);
    return data;
  } catch (error) {
    console.error(`Error updating event: ${error.message}`);
    return null; // Return null if error occurs
  }
};

export const deleteEvent = async (id) => {
  try {
    const { data } = await axios.delete(`${BASE_API_URL}/delete/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting event: ${error.message}`);
    return null; // Return null if error occurs
  }
};
