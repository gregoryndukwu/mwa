const mongoose = require("mongoose");

const coachesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
});

const NbaSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  Championships: {
    type: Number,
    require: true,
  },
  coaches: [coachesSchema],
});
mongoose.model(process.env.NBA_MODEL, NbaSchema, process.env.NBA_COLLECTIONS);

module.exports = {
  NbaSchema,
};
