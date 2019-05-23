const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    about: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("User", schema);
