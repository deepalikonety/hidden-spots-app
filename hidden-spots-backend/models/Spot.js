const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  name: String,
  description: String,
  vibe: String,
  imageUrls: [String],
  ratings: {
    uniqueness: Number,
    vibe: Number,
    safety: Number,
    crowd: Number
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number]
  },
  comments: [
    {
      text: String,
      user: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
});

SpotSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Spot', SpotSchema);
