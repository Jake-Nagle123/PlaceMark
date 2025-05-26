import { db } from "../models/db.js";

export const githubRoutes = [
  {
    method: "GET",
    path: "/auth/github",
    options: {
      auth: "github",
      handler: async (request, h) => {
        if (request.auth.isAuthenticated) {
          const { profile } = request.auth.credentials.profile;
          // Try to find user by GitHub id or username/email
          let user = await db.userStore.getUserByEmail(profile.email);
          if (!user) {
            // Create a new user in your DB
            user = await db.userStore.addUser({
              firstName: profile.displayName || profile.username,
              lastName: "",
              email: profile.email || `${profile.username}@github.com`,
              password: "", // or a random string, since they use GitHub
              githubId: profile.id,
              avatar: profile.raw.avatar_url,
            });
          }
          request.cookieAuth.set({ id: user._id });
          return h.redirect("/dashboard");
        }
        return h.view("/", {
          error: "Could not authenticate with GitHub."
        }).code(400);
      }
    }
  }
];