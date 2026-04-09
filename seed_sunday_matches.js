const mongoose = require('mongoose');
require('dotenv').config();
const FFTournament = require('./ff/models/FFTournament');

async function seedSundayMatches() {
    try {
        await mongoose.connect(process.env.FF_MONGODB_URI);
        console.log('Connected to FF Database');

        const creatorId = '69d6881d51c2b4fb074e9843'; // Moderator ID
        const date = '2026-04-12'; // Coming Sunday
        const entryFee = 10;
        const maxPlayers = 48; // Classic standard
        const prizePool = Math.floor(entryFee * maxPlayers * 0.8); // 80% collection

        const matchTypes = ['1v1', '2v2', '4v4'];
        const matches = [];

        // Distribute 15 matches from 10:00 to 22:00 (12 hours)
        // Interval: 720 minutes / 14 = ~51 minutes
        for (let i = 0; i < 15; i++) {
            const teamSize = matchTypes[i % 3];
            const startTime = new Date(`${date}T10:00:00`);
            startTime.setMinutes(i * 45); // Roughly 45 mins apart

            const ddmmyyyy = '12042026';
            const xx = 'CL'; // Classic
            const z = teamSize.includes('1v1') ? '1' : teamSize.includes('2v2') ? '2' : '4';
            const yy = String(i + 1).padStart(2, '0');
            const roomName = `FFT_${ddmmyyyy}_${xx}${z}_${yy}`;

            matches.push({
                roomName,
                roomCode: 'TBD',
                password: 'TBD',
                entryFee,
                prizePool,
                gameMode: 'Classic',
                teamSize,
                status: 'Upcoming',
                maxPlayers,
                startTime,
                creator: creatorId,
                players: []
            });
        }

        await FFTournament.insertMany(matches);
        console.log('Successfully seeded 15 matches for Sunday!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seedSundayMatches();
