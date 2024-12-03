const { MongoClient } = require('mongodb');
require('dotenv').config();

module.exports = async (req, res) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('test');
    const lastVisit = await db.collection('visits')
      .findOne({}, { sort: { timestamp: -1 } });
    await client.close();
    res.json({ 
      message: 'Welcome to API 3!',
      lastVisit: lastVisit?.timestamp || 'No visits yet'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
