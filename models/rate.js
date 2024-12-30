import mongoose from 'mongoose'

const rateSchema = new mongoose.Schema({
  originBlock: { type: String, required: true },
  destinationBlock: { type: String, required: true },
  ratePerKg: { type: Number, required: true }
});

const Rate = mongoose.model('Rate', rateSchema);

export default Rate;
