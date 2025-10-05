import axios from "axios";

// const API_BASE = "http://localhost:4000/api";
const API_BASE = "https://itinerary-generation-platform-backend.onrender.com/api";

export const fetchTrips = () => axios.get(`${API_BASE}/trips`).then(res => res.data);
export const fetchTripById = (id) => axios.get(`${API_BASE}/trips/${id}`).then(res => res.data);
export const createTrip = (trip) => axios.post(`${API_BASE}/trips`, trip).then(res => res.data);
export const regenerateTrip = (id) => axios.post(`${API_BASE}/trips/${id}/regenerate`).then(res => res.data);

// Activities
export const createActivity = (activity) => axios.post(`${API_BASE}/activities`, activity).then(res => res.data);
export const updateActivity = (id, data) => axios.put(`${API_BASE}/activities/${id}`, data).then(res => res.data);
export const deleteActivity = (id) => axios.delete(`${API_BASE}/activities/${id}`).then(res => res.data);

// Shared trip
export const fetchSharedTrip = (token) => axios.get(`${API_BASE}/trips/share/token/${token}`).then(res => res.data);
