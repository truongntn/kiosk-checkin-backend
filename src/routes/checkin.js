const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CheckIn = require('../models/CheckIn');
const Queue = require('../models/Queue');
const auth = require('../middleware/auth');

router.post('/checkin', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  try {
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone });
      await user.save();
    }

    const checkIn = new CheckIn({ userId: user._id });
    await checkIn.save();

    user.rewardPoints += checkIn.rewardPointsEarned;
    await user.save();

    const lastQueue = await Queue.findOne().sort({ position: -1 });
    const position = lastQueue ? lastQueue.position + 1 : 1;
    const estimatedWaitTime = position * 5;
    const queueEntry = new Queue({
      userId: user._id,
      position,
      estimatedWaitTime,
    });
    await queueEntry.save();

    res.json({
      rewardPoints: user.rewardPoints,
      queuePosition: position,
      estimatedWaitTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user/:phone', async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const queueEntry = await Queue.findOne({ userId: user._id }).sort({ checkInTime: -1 });
    res.json({
      rewardPoints: user.rewardPoints,
      queuePosition: queueEntry ? queueEntry.position : null,
      estimatedWaitTime: queueEntry ? queueEntry.estimatedWaitTime : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;