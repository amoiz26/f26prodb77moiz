
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// LAB 13 - NEW: Passport Local Mongoose
const passportLocalMongoose =
  require('passport-local-mongoose').default;

// LAB 13 - NEW: Account Schema
const accountSchema = new Schema({
  username: String,
  password: String
});

// LAB 13 - NEW: Authentication plugin
accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
