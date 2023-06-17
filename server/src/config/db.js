const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  let attempts = 10;
  while (attempts) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      break;

    } catch (err) {
      console.log("Error: ", err.message);
      attempts -= 1;
      console.log(`connection attempts left: ${attempts}`);
      // wait for 10 seconds before retrying
      await new Promise(res => setTimeout(res, 10000));

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
};

module.exports = { connectDB };