const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const run = async () => {
  try {
    const URI = process.env.FF_MONGODB_URI;
    if (!URI) { throw new Error('FF_MONGODB_URI not found in .env'); }

    await mongoose.connect(URI);
    console.log('Connected to FF Database');

    // Define minimum needed schemas to avoid separate file dependencies
    const UserSchema = new mongoose.Schema({
      walletBalance: { type: Number, default: 0 }
    }, { timestamps: true, strict: false });

    const TransactionSchema = new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, required: true },
      type: { type: String, required: true },
      amount: { type: Number, required: true },
      description: { type: String, required: true },
      status: { type: String, default: 'Success' }
    }, { timestamps: true });

    const User = mongoose.model('FFUser_Migrate', UserSchema, 'ffusers'); 
    const Transaction = mongoose.model('FFTransaction_Migrate', TransactionSchema, 'fftransactions');

    const users = await User.find({});
    console.log(`Found ${users.length} users. Applying ₹20 bonus...`);

    for (const user of users) {
      await User.updateOne(
        { _id: user._id },
        { $inc: { walletBalance: 20 } }
      );

      await new Transaction({
        user: user._id,
        type: 'CREDIT',
        amount: 20,
        description: 'System-wide Welcome Bonus',
        status: 'Success'
      }).save();
    }

    console.log(`Successfully credited ₹20 to ${users.length} users.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

run();
