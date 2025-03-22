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
};