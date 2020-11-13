const passport = require("passport");
GoogleStrategy = require("passport-google-oauth20").Strategy;
LocalStrategy = require("passport-local");
User = require("../models/User");
bcrypt = require("bcrypt");
keys = require("../config/keys");

passport.serializeUser((user, done) => {
  console.log("Sequalizing");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deSequalizing");
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ "google.id": profile.id });
      if (existingUser) {
        console.log("User exists");
        return done(null, existingUser);
      }
      console.log(profile);
      const user = new User({
        google: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      });
      console.log("During service", user);
      await user.save();
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      //by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      //   console.log(email);
      //   console.log(password);

      console.log("Local service Called");
      User.findOne({ "local.email": email }, function (err, user) {
        if (err) {
          console.log("Error");
          return done(err);
        }
        console.log(user, "Found");
        if (!user || !user.confirmPassword(password)) {
          console.log("incorrect passwrod given.");
          return done(null, false);
        }
        console.log("Correct password given.");
        
        return done(null, user);
      });
    }
  )
);
//for signup

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      console.log("Local Signup called.");
      console.log(email, password);
      User.findOne({ "local.email": email }, async function (err, user) {
        console.log(user);
        if (err) return done(err);
        if (user) {
          console.log("User already exists.");
          return done(null, false);
        }
        var newUser = new User({
          local: {
            email,
            password,
          },
        });
        await newUser.save();
        return done(null, newUser);
      });
    }
  )
);
