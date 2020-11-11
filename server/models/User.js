const mongoose = require("mongoose");
const ListSchema = require("./ListSchema");

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
  list: [ListSchema],
  google: {
    id: String,
    email: String,
  },
  admin: {
    type: Boolean,
    default: false,
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
