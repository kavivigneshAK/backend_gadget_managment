const express = require('express');
const Contact = require('../models/Contact');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await contact.save();
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contacts (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;