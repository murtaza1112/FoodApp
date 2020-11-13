const User = require("../models/User");
const Indian = require("../models/Indian");
const Italian = require("../models/Italian");
const Chinese = require("../models/Chinese");
const Continental = require("../models/Continental");
const { cloudinary } = require("../config/cloudinary");

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

module.exports = (app) => {
  //upate the list
  app.patch("/api/list/:type/:id", isLoggedIn, async (req, res) => {
   console.log("The update api called.");
   const { id, type } = req.params;
   const curitem = req.body;
   console.log(req.params);

  //  type passed is old type
   var item;
   if (type === "italian") item = await Italian.findByIdAndRemove(id);
   else if (type === "indian") item = await Indian.findByIdAndRemove(id);
   else if (type === "chinese") item = await Chinese.findByIdAndRemove(id);
   else item = await Continental.findByIdAndRemove(id);


   if(!validURL(curitem.image)){
      //if not a url,
      console.log("It is not a url.")
      const uploadResponse = await cloudinary.uploader.upload(curitem.image, {
        upload_preset: "murtazaImages",
      });
      console.log(uploadResponse);
      curitem.image = uploadResponse.secure_url;
   }
   var item;
   if (curitem.type === "italian") item = await Italian.create(curitem);
   else if (curitem.type === "indian") item = await Indian.create(curitem);
   else if (curitem.type === "chinese") item = await Chinese.create(curitem);
   else item = await Continental.create(curitem);

   console.log(item);
   console.log("item sent");
   res.send(curitem);
  });

  //delete an element from list
  app.delete("/api/list/:type/:id", isLoggedIn, async (req, res) => {
    console.log("The delete api called.");
    const { id,type } = req.params;
    console.log(req.params);

    var item;
    if (type === "italian") item = await Italian.findByIdAndRemove(id);
    else if (type === "indian") item = await Indian.findByIdAndRemove(id);
    else if (type === "chinese") item = await Chinese.findByIdAndRemove(id);
    else item = await Continental.findByIdAndRemove(id);

    console.log(item);
    res.send(item);
  });

  //get all lists
  app.get("/api/list/:type", isLoggedIn, async (req, res) => {
    const { type } = req.params;
    var data;
    
    if (type === "italian") data = await Italian.find({});
    else if (type === "indian") data = await Indian.find({});
    else if (type === "chinese") data = await Chinese.find({});
    else data = await Continental.find({});
    console.log(type,data);
    res.send(data);
  });

  app.get("/api/list/single/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    var data;
    console.log("the list call",id)
    if (!data) data = await Italian.findById(id);
    else if (!data) data = await Indian.findById(id);
    else if (!data) data = await Chinese.findById(id);
    else data = await Continental.findById(id);

    console.log(data);
    res.send(data);
  });

  //create a list element
  app.post("/api/list/:type", isLoggedIn, async (req, res) => {
    console.log("add called");
    const type = req.params.type;
    const item = req.body;

    console.log(req.params.type);
    console.log(req.params);

    const uploadResponse = await cloudinary.uploader.upload(item.image, {
      upload_preset: "murtazaImages",
    });
    console.log(uploadResponse);
    item.image = uploadResponse.secure_url;
    var data;
    // console.log(type);
    if (type === "italian") data = await Italian.create(item);
    else if (type === "indian") data = await Indian.create(item);
    else if (type === "chinese") data = await Chinese.create(item);
    else data = await Continental.create(item);

    console.log(type, data);
    res.send(data);
  });

  function isLoggedIn(req, res, next) {
    console.log("Is loggedin.")
    if (req.isAuthenticated()) {
      console.log("User is logged in.");
      next();
    } else {
      console.log("User is not signed in.")
      res.redirect("/");
    }
  }
};
