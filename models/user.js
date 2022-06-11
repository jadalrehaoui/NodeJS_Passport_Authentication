const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleID: {type: String},
  name: {type: String}
})

mongoose.model("users", UserSchema);
