const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://orcadehub2:orcadehub2@orcadehub.twfptkz.mongodb.net/?retryWrites=true&w=majority";
async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const dbs = await client.db('admin').admin().listDatabases();
        console.log(dbs.databases.map(d => d.name));
        await client.close();
    } catch (e) {
        console.error(e);
    }
}
run();
