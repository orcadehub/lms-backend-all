const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const FFUser = require('../models/FFUser');
const FFTransaction = require('../models/FFTransaction');
const auth = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Verify FF UID (Check if player exists and meet level requirements)
router.get('/verify/:uid', async (req, res) => {
  const { uid } = req.params;
  
  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await FFUser.findOne({ ffUid: uid });
    if (existingUser) {
      return res.status(400).json({ error: 'This UID is already registered' });
    }

    const apiKey = process.env.FREEFIRE_API_KEY;
    console.log(`[API] Verifying UID ${uid}...`);
    
    try {
      // Check Ban Status First
      const banRes = await axios.get(`https://developers.freefirecommunity.com/api/v1/bancheck?key=${apiKey}&lang=en&uid=${uid}`);
      const isBanned = banRes.data?.data?.is_banned === 1;

      if (isBanned) {
         return res.status(403).json({ 
            error: 'CRITICAL: This Free Fire account is BANNED.', 
            isBanned: true 
         });
      }

      const apiRes = await axios.get(`https://developers.freefirecommunity.com/api/v1/info?key=${apiKey}&region=ind&uid=${uid}`);
      
      if (apiRes.data && apiRes.data.basicInfo) {
        const { nickname, level } = apiRes.data.basicInfo;
        return res.json({ 
          success: true, 
          name: nickname || 'Unknown', 
          level: parseInt(level) || 0,
          raw: apiRes.data
        });
      } else {
        return res.status(404).json({ error: 'Player not found in Free Fire Database' });
      }
    } catch (apiErr) {
      console.error('[API Error]', apiErr.response?.data || apiErr.message);
      return res.status(500).json({ error: 'Could not connect to Free Fire Server' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register a new user (Signup)
router.post('/register', async (req, res) => {
  const { ffUid, password } = req.body;
  
  if (!ffUid || !password) {
    return res.status(400).json({ error: 'UID and Password are required' });
  }

  try {
    let user = await FFUser.findOne({ ffUid });
    if (user) return res.status(400).json({ error: 'FFUser with this UID already exists' });

    let ffData = {};
    let other = {};
    let inGameName = 'New Player';
    let level = 0;
    let stats = { kdRatio: 0, matchesPlayed: 0, wins: 0 };
    let isBanned = false; // Track ban status

    try {
      const apiKey = process.env.FREEFIRE_API_KEY;
      
      // Mandatory Ban Check on Final Register
      const banRes = await axios.get(`https://developers.freefirecommunity.com/api/v1/bancheck?key=${apiKey}&lang=en&uid=${ffUid}`);
      if (banRes.data?.data?.is_banned === 1) {
          return res.status(403).json({ error: 'This account is BANNED from Free Fire and cannot be registered.' });
      }

      const apiRes = await axios.get(`https://developers.freefirecommunity.com/api/v1/info?key=${apiKey}&region=ind&uid=${ffUid}`);
      
      if (apiRes.data) {
        other = apiRes.data; // Store full response here
        
        if (apiRes.data.basicInfo) {
          ffData = apiRes.data;
          inGameName = apiRes.data.basicInfo.nickname || inGameName;
          level = apiRes.data.basicInfo.level || 0;

          // Populate combat stats if available
          if (apiRes.data.combatStats) {
            stats.kdRatio = apiRes.data.combatStats.kdRatio || 0;
            stats.matchesPlayed = apiRes.data.combatStats.matchesPlayed || 0;
            stats.wins = apiRes.data.combatStats.wins || 0;
          }
          console.log(`[API] Detailed Sync for ${ffUid}: ${inGameName}`);
        }
      }
    } catch (apiErr) {
      console.error('[API Error] FF Data Sync Failed:', apiErr.response?.data || apiErr.message);
    }

    user = new FFUser({
      ffUid,
      password,
      inGameName,
      level,
      stats,
      ffData,
      other,
      isBanned,
      walletBalance: 20 // Signup Bonus
    });

    await user.save();

    // Create bonus transaction record
    await new FFTransaction({
      user: user._id,
      type: 'CREDIT',
      amount: 20,
      description: 'Signup Bonus',
      status: 'Success'
    }).save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { ffUid, password } = req.body;
  
  if (!ffUid || !password) {
    return res.status(400).json({ error: 'UID and Password are required' });
  }

  try {
    const user = await FFUser.findOne({ ffUid });
    if (!user) return res.status(401).json({ error: 'Player account not found. Please register first.' });

    // Check if account is banned in our records
    if (user.isBanned) {
        return res.status(403).json({ error: 'ACCESS DENIED: This account has been banned due to policy violations.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password. Try again.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Google Sign In / Sign Up
router.post('/google', async (req, res) => {
  const { credential } = req.body;
  
  if (!credential) {
    return res.status(400).json({ error: 'Google credential is required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Try to find by googleId or email
    let user = await FFUser.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Signup: Create new user
      user = new FFUser({
        googleId,
        email,
        inGameName: name || 'New Player',
        other: { googlePicture: picture },
        walletBalance: 20 // Signup Bonus
      });
      await user.save();
      
      // Create bonus transaction record
      await new FFTransaction({
        user: user._id,
        type: 'CREDIT',
        amount: 20,
        description: 'Signup Bonus',
        status: 'Success'
      }).save();

      console.log(`[Auth] New User created via Google: ${email}`);
    } else {
      // Login: Update googleId if missing
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error('[Google Auth Error]', err.message);
    res.status(401).json({ error: 'Authentication with Google failed' });
  }
});

// Update FF UID
router.post('/update-uid', auth, async (req, res) => {
  const { ffUid } = req.body;
  if (!ffUid) return res.status(400).json({ error: 'UID is required' });

  try {
    const existing = await FFUser.findOne({ ffUid });
    if (existing) return res.status(400).json({ error: 'This UID is already linked to another account' });

    const user = await FFUser.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.ffUid = ffUid;
    
    // Sync FF details
    try {
      const apiKey = process.env.FREEFIRE_API_KEY;
      console.log(`[API] Fetching FF Info for UID: ${ffUid} (Region: IND)...`);
      
      const apiRes = await axios.get(`https://developers.freefirecommunity.com/api/v1/info?key=${apiKey}&region=IND&uid=${ffUid}`);
      
      if (apiRes.data && apiRes.data.basicInfo) {
        console.log(`[API] Success! Nickname: ${apiRes.data.basicInfo.nickname}`);
        user.inGameName = apiRes.data.basicInfo.nickname || user.inGameName;
        user.level = apiRes.data.basicInfo.level || 0;
        user.ffData = apiRes.data;
        
        // Populate stats if available in any sub-object
        const stats = apiRes.data.combatStats || apiRes.data.basicInfo;
        if (stats) {
          user.stats.kdRatio = stats.kdRatio || 0;
          user.stats.matchesPlayed = stats.matchesPlayed || 0;
          user.stats.wins = stats.wins || 0;
        }
      } else {
        console.warn('[API] Response received but no basicInfo found:', apiRes.data);
      }
    } catch (apiErr) {
      console.error('[API Error] Sync failed:', apiErr.response?.data || apiErr.message);
    }
    
    await user.save();


    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Disconnect FF UID
router.post('/disconnect', auth, async (req, res) => {
  try {
    const user = await FFUser.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.ffUid = undefined;
    user.ffData = {};
    user.stats = { kdRatio: 0, matchesPlayed: 0, wins: 0 };
    await user.save();

    res.json({ success: true, message: 'Account disconnected' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await FFUser.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
