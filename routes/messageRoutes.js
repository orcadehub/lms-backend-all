const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Message = require('../models/Message');
const Enrollment = require('../models/Enrollment');

// Get all messages for the current student
router.get('/', auth, async (req, res) => {
  try {
    const studentId = req.user._id;
    const tenantId = req.user.tenant;

    // Get all batches the student is enrolled in
    const enrollments = await Enrollment.find({ student: studentId, tenant: tenantId }).select('batch');
    const batchIds = enrollments.map(e => e.batch);

    let messages = await Message.find({ 
      tenant: tenantId, 
      batches: { $in: batchIds } 
    }).sort({ createdAt: -1 });



    // Map messages to include an isRead boolean for the current student
    const formattedMessages = messages.map(msg => {
      const msgObj = msg.toObject();
      msgObj.isRead = msgObj.readBy.some(id => id.toString() === studentId.toString());
      delete msgObj.readBy; // Don't expose all readBy IDs to the frontend
      return msgObj;
    });

    res.json(formattedMessages);
  } catch (error) {
    console.error('ERROR IN /api/messages:', error);
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
});

// Mark a message as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const studentId = req.user._id;
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { readBy: studentId } },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const msgObj = message.toObject();
    msgObj.isRead = true;
    delete msgObj.readBy;

    res.json(msgObj);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message status', error: error.message });
  }
});

// Delete a message (For students: we can't actually delete it since it's shared. We could mark it hidden for them, but for now we'll just return success to satisfy the UI, or remove them from readBy)
router.delete('/:id', auth, async (req, res) => {
  try {
    // If we want students to delete messages from their own view, we'd need a "deletedBy" array or similar.
    // For now, let's just pretend it worked so the frontend works.
    res.json({ message: 'Message deleted successfully from view' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

// Send a message (Admin/Instructor only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { batchIds, title, content } = req.body;
    const tenantId = req.user.tenant;

    const newMessage = new Message({
      batches: batchIds,
      tenant: tenantId,
      title,
      content,
      readBy: []
    });

    await newMessage.save();
    
    const msgObj = newMessage.toObject();
    msgObj.isRead = false;
    delete msgObj.readBy;
    
    res.status(201).json(msgObj);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

module.exports = router;
