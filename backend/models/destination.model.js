import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  Destination: {
    type: String,
    required: true,
  },
  Region: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Latitude: {
    type: Number,
    required: true,
  },
  Longitude: {
    type: Number,
    required: true,
  },
  'Approximate Annual Tourists': {
    type: String,
    required: true,
  },
  Currency: {
    type: String,
    required: true,
  },
  'Majority Religion': {
    type: String,
    required: true,
  },
  'Famous Foods': {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  'Best Time to Visit': {
    type: String,
    required: true,
  },
  'Cost of Living': {
    type: String,
    required: true,
  },
  safety: {
    type: String,
    required: true,
  },
  'Cultural Significance': {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
