const { MongoClient } = require('mongodb');
const uri = "mongodb://azzuzie:AzzuDeepu123@134.195.138.140:27017/?authSource=admin";
async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        
        const lmsq_db = client.db('lmsq');
        const collections = await lmsq_db.collections();
        console.log("lmsq Collections:", collections.map(c => c.collectionName));
        for (const col of collections) {
             const count = await col.countDocuments();
             console.log("lmsq", col.collectionName, "->", count, "documents");
        }
        await client.close();
    } catch (e) {
        console.error(e);
    }
}
run();
