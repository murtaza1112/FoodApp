const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      index: true,
      sparse: true,
    },
    password: {
      type: String,
    },
  },
  list: [
    { itemId: { type: Number }, createdAt: { type: Date, default: Date.now } },
  ],
  google: {
    id: String,
    email: String,
  },
});
const saltRounds = 10;

UserSchema.pre("save", async function () {
  if (this.isModified("local.password")) {
    let hash = bcrypt.hashSync(this.local.password, saltRounds);
    this.local.password = hash;
    console.log("Changed Passwood", this);
  }
});

UserSchema.methods.confirmPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
