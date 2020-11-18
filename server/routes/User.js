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
    console.log("Checking if user is valifated or not.");
    console.log(req.user);
    if (!req.user) return res.send(false);
    res.send(req.user);
  });
  app.get("/", (req, res) => {
    console.log("Home page.");
    res.send(req.user);
  });

  // app.post(
  //   "/api/login",
  //   function (req, res) {

  //     passport.authenticate('login',
  //         {
  //           //by default, local strategy uses username and password, we will override with email
  //           usernameField: "email",
  //           passwordField: "password",
  //         },
  //         function (email, password, done) {
  //           //   console.log(email);
  //           //   console.log(password);

  //         }
  //       )
  //     console.log(req.body);
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     res.send(req.body);
  //   }
  // );

  app.post("/api/login", function (req, res, next) {
    console.log("LOGIN CALLED.");
    passport.authenticate("local", function (err, user, info) {
      console.log("CALLBACK PASSED:", user, err);
      if (err) {
        return next(err);
      }
      console.log("Api called.", user);
      if (!user) {
        console.log("NO USER FOUND.");
        return res.send(false);
      }
      req.logIn(user, function (err) {
        if (err) 
          return next(err);
        return res.send(user);
      });
    })(req, res, next);
    console.log("LOGIN API ENDING");
  });

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
  app.post("/api/signup", (req, res, next) => {
    passport.authenticate("local-signup", function (err, user, info) {
      if (!user) {
        console.log("USER ALREADY EXISTS");
        return res.send(false);
      }
      console.log(user);
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
    console.log("this part called");
    // res.send(false);
  });

  app.post("/api/user", async (req, res) => {
    console.log(req.body);
    const item = req.body;
    req.user.list.push(item);
    await req.user.save();
    console.log(item, req.user);
    res.send(req.user);
  });

  app.delete("/api/user", async (req, res) => {
    console.log(req.body);
    req.user.list = req.user.list.filter((elem) => elem.id !== req.body.id);
    await req.user.save();
    console.log(req.user);
    res.send(req.user);
  });
};
