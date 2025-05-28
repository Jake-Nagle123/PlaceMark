import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { eventController } from "./controllers/event-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addevent", config: dashboardController.addEvent },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/event/{id}", config: eventController.index },
  { method: "POST", path: "/event/{id}/addstadium", config: eventController.addStadium },

  { method: "GET", path: "/dashboard/deleteevent/{id}", config: dashboardController.deleteEvent },
  { method: "GET", path: "/event/{id}/deletestadium/{stadiumid}", config: eventController.deleteStadium },

  { method: "POST", path: "/event/{id}/uploadimage", config: eventController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];