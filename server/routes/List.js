module.exports = (app) => {
  //upate the list
  app.patch("/api/list/:id", isLoggedIn, async (req, res) => {
    console.log("add called");
    const { id } = req.params;
    let index = -1;
    for (let i = 0; i < req.user.list.length; i++) {
      if (req.user.list[i].itemId == id) index = i;
    }
    console.log(index);
    if (index != -1) {
      console.log("Sorry this item already exist");
      return res.send(req.user);
    }

    req.user.list.push({ itemId: id });

    await req.user.save();
    console.log(req.user);
    res.send(req.user);
  });

  //delete an element from list
  app.post("/api/list/:id", isLoggedIn, async (req, res) => {
    console.log("The delete api called.")
    const { id } = req.params;
    console.log(id);
    let index = -1;
    for (let i = 0; i < req.user.list.length; i++) {
      if (req.user.list[i].itemId == id) index = i;
    }
    console.log(index);
    if (index == -1) {
      console.log("Sorry this item does not exist");
      return res.send(req.user);
    }
    req.user.list.splice(index, 1);
    await req.user.save();
    console.log(req.user);
    res.send(req.user);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("User is logged in.");
      next();
    } else {
      res.redirect("/");
    }
  }
};
