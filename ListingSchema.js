/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var config = require('./config');

mongoose.connect(config.db.uri);

/* Create your schema */
var listingSchema = new Schema({
  /* your code here */
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  coordinates: {
    latitude: String,
    longitude: String
  },
  address: String,
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */
  var todaysDate = new Date();

  this.updated_at = todaysDate;

  if(!this.created_at) {
    this.created_at = todaysDate;
  }

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
