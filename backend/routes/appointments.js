const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate('hospital');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { hospital, doctorName, date, reason } = req.body;
    const appt = new Appointment({ patient: req.user.id, hospital, doctorName, date, reason });
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    if (appt.patient.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    Object.assign(appt, req.body);
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    if (appt.patient.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await appt.remove();
    res.json({ message: 'Appointment removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
