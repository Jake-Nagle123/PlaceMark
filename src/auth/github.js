import Bell from "@hapi/bell";
// import Cookie from "@hapi/cookie";

async function register (server, options) {  
    await server.register(
    {
      plugin: Bell
    },
);

  /**
   * Register 'github' authentication strategy
   */
  server.auth.strategy("github", "bell", {
    provider: "github",
    password: "ThisIsASecretCookiePasswordForGitHub",
    clientId: "Ov23liXTZO0xKofGBPf9",
    clientSecret: "e9f5c3557549419014b4a63e823c509c0bb58723",
    isSecure: process.env.NODE_ENV === "production"
  })

/**
 * NOT BEING USED -Aleady have a cookie in place
 * Register session based auth strategy to store
 * credentials received from GitHub and keep
 * the user logged in
 */
//  server.auth.strategy("session", "cookie", {
//    password: "ThisIsASecretPasswordForTheAuthCookie",
//    redirectTo: "/",
//    isSecure: process.env.NODE_ENV === "production"
//  })

server.log("info", "Plugin registered: bell authentication with strategy »github«")
}

export const plugin = {  
  register,
  name: "authentication",
  version: "1.0.0",
  once: true
}