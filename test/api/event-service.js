import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const eventService = {
  eventUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.eventUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.eventUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.eventUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.eventUrl}/api/users`);
    return res.data;
  },

  async createEvent(event) {
    const res = await axios.post(`${this.eventUrl}/api/events`, event);
    return res.data;
  },

  async deleteAllEvents() {
    const response = await axios.delete(`${this.eventUrl}/api/events`);
    return response.data;
  },

  async deleteEvent(id) {
    const response = await axios.delete(`${this.eventUrl}/api/events/${id}`);
    return response;
  },

  async getAllEvents() {
    const res = await axios.get(`${this.eventUrl}/api/events`);
    return res.data;
  },

  async getEvent(id) {
    const res = await axios.get(`${this.eventUrl}/api/events/${id}`);
    return res.data;
  },
};