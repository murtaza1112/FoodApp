const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log("The req.user is:", req.user);
      res.send(req.user);
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  app.get("/api/current", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
  app.get("/", (req, res) => {
    console.log("Home page.");
    res.send(req.user);
  });

  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/api/current",
      failureRedirect: "/",
    }),
    function (req, res) {
      console.log(req.body);
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.send(req.body);
    }
  );

  //   app.post("/api/signup", async (req, res) => {
  //     const { email, password } = req.body;
  //     console.log("The siugnin email is:",email);
  //     const user = await User.findOne({ "local.email": email });

  //     if (user) {
  //       res.send({ error: "The given username already exists." });
  //     }
  //     const newUser = new User({
  //       local: {
  //         email,
  //         password,
  //       },
  //     });
  //     await newUser.save();
  //     console.log(newUser);
  //     passport.authenticate("local", {
  //       successRedirect: "/api/current",
  //       failureRedirect: "/",
  //     });
  //   });
  app.post(
    "/api/signup",
    passport.authenticate("local-signup", {
      failureRedirect: "/",
    }),
    (req, res) => {
      res.send(req.user);
    }
  );
};
