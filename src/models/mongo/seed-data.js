export const seedData = {
  users: {
    _model: "User",
    kevin: {
      firstName: "Kevin",
      lastName: "Malone",
      email: "kevin@malone.com",
      password: "office"
    },
    pam: {
      firstName: "Pam",
      lastName: "Beesly",
      email: "pam@beesly.com",
      password: "office"
    },
    jim: {
      firstName: "Jim",
      lastName: "Halpert",
      email: "jim@halpert.com",
      password: "office"
    }
  },
  events: {
    _model: "Event",
    trip: {
      title: "Match Day Favourites",
      userid: "->users.jim"
    }
  },
  stadiums: {
    _model : "Stadium",
    stadium_1 : {
      stadium: "Anfield",
      competition: "Premier League",
      rating: 7.0,
      city: "Liverpool",
      latitude: 53.43,
      longitude: -2.96,
      eventid: "->events.trip"
    },
  }
};