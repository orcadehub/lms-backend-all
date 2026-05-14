const { MongoClient } = require('mongodb');
const uri = "mongodb://azzuzie:AzzuDeepu123@134.195.138.140:27017/?authSource=admin";
async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const ff_db = client.db('ff_db');
        const collections = await ff_db.collections();
        console.log("ff_db Collections:", collections.map(c => c.collectionName));
        for (const col of collections) {
             const count = await col.countDocuments();
             console.log(col.collectionName, "->", count, "documents");
        }
        
        console.log("-----");
        const r_db = client.db('READ_ME_TO_RECOVER_YOUR_DATA');
        const r_colls = await r_db.collections();
        for (const col of r_colls) {
            const docs = await col.find({}).toArray();
            console.log("Ransomware message:\n", JSON.stringify(docs, null, 2));
        }

        await client.close();
    } catch (e) {
        console.error(e);
    }
}
run();
