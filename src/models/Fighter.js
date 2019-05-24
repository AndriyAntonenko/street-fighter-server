const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    attack: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    defense: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    health: {
      type: Number,
      required: true,
      min: 30,
      max: 100
    },
    source: {
      type: String,
      required: true,
      maxlength: 500
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("Fighter", schema);
