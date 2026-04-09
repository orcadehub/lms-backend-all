const cron = require('node-cron');
const mongoose = require('mongoose');
const FFTournament = require('../models/FFTournament');
const FFModerator = require('../models/FFModerator');

/**
 * Generates matches for a specific day in IST.
 */
async function generateDailyMatches(dateInIST = new Date()) {
    try {
        // Convert the input date to a string in IST to verify
        const istDateStr = dateInIST.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        console.log(`[Scheduler] Starting match generation for (IST): ${istDateStr}`);
        
        const moderator = await FFModerator.findOne({ username: 'ajithkumargurram@gmail.com' });
        if (!moderator) {
            console.error('[Scheduler] Moderator not found, skipping generation.');
            return;
        }

        // Extract day/month/year from IST perspective
        const istParts = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            timeZone: 'Asia/Kolkata'
        }).formatToParts(dateInIST);
        
        const d = istParts.find(p => p.type === 'day').value;
        const m = istParts.find(p => p.type === 'month').value;
        const y = istParts.find(p => p.type === 'year').value;
        const ddmmyyyy = `${d}${m}${y}`;

        const matches = [];
        
        for (let hour = 9; hour <= 23; hour++) {
            // Calculate IST-based hourly entry fee: Rotate 10, 20, 30 every 3 hours
            const entryFee = ((hour - 9) % 3 + 1) * 10;

            // Calculate UTC equivalent of 'hour:00' IST on that day
            const startTimeUTC = new Date(Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d), hour, 0, 0));
            startTimeUTC.setMinutes(startTimeUTC.getMinutes() - 330); // Subtract 5h 30m

            const formats = ['1v1', '2v2', '4v4'];
            formats.forEach(teamSize => {
                matches.push(createMatchObject(startTimeUTC, 'Classic', teamSize, ddmmyyyy, entryFee, moderator._id));
            });
            formats.forEach(teamSize => {
                matches.push(createMatchObject(startTimeUTC, 'Clash Squad', teamSize, ddmmyyyy, entryFee, moderator._id));
            });
        }

        await FFTournament.insertMany(matches);
        console.log(`[Scheduler] Successfully seeded ${matches.length} IST matches for ${ddmmyyyy}`);
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

// Initialize cron job: Run at 3:00 AM IST daily
function initTournamentScheduler() {
    console.log('[Scheduler] Tournament generator initialized (IST Aware).');
    
    cron.schedule('0 3 * * *', () => {
        console.log('[Scheduler] Running daily match generation at 3 AM IST...');
        generateDailyMatches(new Date());
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

module.exports = { initTournamentScheduler, generateDailyMatches };
