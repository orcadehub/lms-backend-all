const { MongoClient } = require('mongodb');
const uri = "mongodb://adminUser:StrongPassword123!@134.195.138.140:27017/?authSource=admin";

async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('admin');
        await db.command({ updateUser: "adminUser", pwd: "NewStrongPassword2026!", roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]});
        await db.command({ updateUser: "azzuzie", pwd: "NewStrongPassword2026!" });
        console.log("Passwords updated successfully!");
        client.close();
    } catch(err) {
        console.log("Error changing password:", err.message);
    }
}
run();
