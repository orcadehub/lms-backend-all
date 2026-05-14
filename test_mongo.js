const { MongoClient } = require('mongodb');
const uri = "mongodb://azzuzie:AzzuDeepu123@134.195.138.140:27017/?authSource=admin";
async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const adminDb = client.db('admin');
        const dbs = await adminDb.admin().listDatabases();
        console.log("Databases :", dbs.databases.map(d => d.name));
        await client.close();
    } catch (e) {
        console.error(e);
    }
}
run();
