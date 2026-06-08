const mongoose = require(`mongoose`);

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  doctorName: String,
  date: { type: Date, required: true },
  reason: String,
  status: { type: String, enum: ['booked','cancelled','completed'], default: 'booked' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
