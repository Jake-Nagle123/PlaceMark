import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const eventService = {
  eventUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.eventUrl}/api/users`, user);
    return res.data;
  }
}