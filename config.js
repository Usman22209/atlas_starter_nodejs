const { MongoClient } = require("mongodb");

const uri = process.env.URI; // Use an environment variable
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("myDatabase");
    return db.collection("todos");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
