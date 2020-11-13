const express = require("express");
cors = require("cors");
cookieSession = require("cookie-session");
cookieParser = require("cookie-parser");
bodyParser = require("body-parser");
keys = require("./config/keys");
app = express();
port = keys.PORT;
passport = require("passport");
mongoose = require("mongoose");
AdminBro = require("admin-bro");
AdminBroExpress = require("admin-bro-expressjs");
uploadFeature = require("@admin-bro/upload");
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

//middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//to inform passport to use cookie based auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/User")(app);
require("./routes/List")(app);

// AdminBro.registerAdapter(require("admin-bro-mongoose"));

require("./models/User");
require("./models/Indian");
require("./models/Italian");
require("./models/Chinese");
require("./models/Continental");
require("./services/passport");

// const ListSchema = require("./models/ListSchema");

// const validation = {
//   mimeTypes: ["image/jpeg", "image/png"],
// };
// const adminBro = new AdminBro({
//   resources: [
//     {
//       resource: User,
//       options: {
//         properties: {
//           "local.password": {
//             isVisible: false,
//           },
//         },
//       },
//     },
//     {
//       resource: List,
//       features: [
//         uploadFeature({
//           provider: { local: { bucket: "uploads" } },
//           properties: {
//             key: "uploadedFile.path",
//             bucket: "uploadedFile.folder",
//             mimeType: "uploadedFile.type",
//             size: "uploadedFile.size",
//             filename: "uploadedFile.filename",
//             file: "uploadFile",
//           },
//           validation,
//         }),
//       ],
//     },
//   ],
//   rootPath: "/admin",
// });

// // Build and use a router which will handle all AdminBro routes
// let router = express.Router();
// router.use((req, res, next) => {
//   console.log("Router called");
//   // console.log(req.session);
//   console.log(req.user);
//   if (req.user.admin) next();
//   else res.redirect("/");
//   // res.redirect("/api/current");
// });
// router = AdminBroExpress.buildRouter(adminBro, router);

// app.use(adminBro.options.rootPath, router);

// Running the server
const run = async () => {
  await mongoose.connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await app.listen(port, (req, res) => {
    console.log("The port is listening on server :", port);
  });
};

run();
