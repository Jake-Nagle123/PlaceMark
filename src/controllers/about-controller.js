export const aboutController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!loggedInUser._id) {
        return h.view("main", { title: "View About page error" }).code(404);
      }
      const viewData = {
        title: "About Placemark",
        userid: loggedInUser._id,
      };
      return h.view("about-view", viewData);
    },
  },
};