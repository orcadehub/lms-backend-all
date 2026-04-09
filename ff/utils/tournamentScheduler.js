const cron = require('node-cron');
const mongoose = require('mongoose');
const FFTournament = require('../models/FFTournament');
const FFModerator = require('../models/FFModerator');

/**
 * Generates matches for a specific day.
 * @param {Date} targetDate - The date to generate matches for.
 */
async function generateDailyMatches(targetDate = new Date()) {
    try {
        console.log(`[Scheduler] Starting match generation for: ${targetDate.toDateString()}`);
        
        // Find a default creator (admin)
        const moderator = await FFModerator.findOne({ username: 'ajithkumargurram@gmail.com' });
        if (!moderator) {
            console.error('[Scheduler] Moderator not found, skipping generation.');
            return;
        }

        const ddmmyyyy = String(targetDate.getDate()).padStart(2, '0') + 
                         String(targetDate.getMonth() + 1).padStart(2, '0') + 
                         targetDate.getFullYear();

        const matches = [];
        const entryFee = 10;
        
        // From 9 AM to 11 PM
        // 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
        for (let hour = 9; hour <= 23; hour++) {
            const startTime = new Date(targetDate);
            startTime.setHours(hour, 0, 0, 0);

            const formats = ['1v1', '2v2', '4v4'];
            
            // Create 3 Classic matches (1v1, 2v2, 4v4) per hour
            formats.forEach(teamSize => {
                matches.push(createMatchObject(startTime, 'Classic', teamSize, ddmmyyyy, entryFee, moderator._id));
            });

            // Create 3 Clash Squad matches (1v1, 2v2, 4v4) per hour
            formats.forEach(teamSize => {
                matches.push(createMatchObject(startTime, 'Clash Squad', teamSize, ddmmyyyy, entryFee, moderator._id));
            });
        }

        await FFTournament.insertMany(matches);
        console.log(`[Scheduler] Successfully seeded ${matches.length} matches for ${targetDate.toDateString()}`);
    } catch (err) {
        console.error('[Scheduler] Generation error:', err);
    }
}

function createMatchObject(startTime, mode, teamSize, ddmmyyyy, entryFee, creatorId) {
    const xx = mode === 'Classic' ? 'CL' : 'CS';
    const z = teamSize.includes('1v1') ? '1' : teamSize.includes('2v2') ? '2' : '4';
    const hh = String(startTime.getHours()).padStart(2, '0');
    
    // Multi-Match uniqueness within the same hour
    // Using a simple flag to distinguish between the 6 matches of the same hour
    const formatTag = teamSize.charAt(0); // 1, 2, or 4
    
    // Calculate maxPlayers based on mode
    let maxPlayers = 48;
    if (mode === 'Clash Squad') {
        maxPlayers = teamSize === '1v1' ? 2 : (teamSize === '2v2' ? 4 : 8);
    }

    return {
        roomName: `AUTO_${ddmmyyyy}_${xx}${z}_${hh}`, // Note: Duplicate check logic in be/ff/routes/moderators.js:104 handles yy suffix
        roomCode: 'TBD',
        password: 'TBD',
        entryFee,
        prizePool: Math.floor(entryFee * maxPlayers * 0.8),
        gameMode: mode,
        teamSize,
        status: 'Upcoming',
        maxPlayers,
        startTime,
        creator: creatorId,
        players: []
    };
}

// Initialize cron job: Run at 3:00 AM daily
function initTournamentScheduler() {
    console.log('[Scheduler] Tournament generator initialized.');
    
    cron.schedule('0 3 * * *', () => {
        console.log('[Scheduler] Running daily match generation at 3 AM...');
        generateDailyMatches(new Date());
    });

    // Optional: Run once on startup for the current day if no matches exist
    // checkAndSeedInitial();
}

module.exports = { initTournamentScheduler, generateDailyMatches };
