const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const queue = await Queue.find().populate('userId', 'phone').sort({ position: 1 });
    res.json(queue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Queue.findByIdAndDelete(req.params.id);
    const queue = await Queue.find().sort({ position: 1 });
    for (let i = 0; i < queue.length; i++) {
      queue[i].position = i + 1;
      queue[i].estimatedWaitTime = queue[i].position * 5;
      await queue[i].save();
    }
    res.json({ message: 'Queue entry removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;