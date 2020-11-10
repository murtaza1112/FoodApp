const express =  require("express");
      cors = require("cors");
      cookieSession = require("cookie-session"); 
      cookieParser = require("cookie-parser");
      bodyParser = require("body-parser")
      keys = require("./config/keys");   
      app = express();          
      port = keys.PORT;
      passport = require("passport");
      mongoose  = require("mongoose");


mongoose.connect(keys.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true });
require("./models/User");
require("./services/passport");
//middleware
app.use(bodyParser.json());

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

app.listen(port,(req,res)=>{
    console.log("The port is listening on server :",port)
})