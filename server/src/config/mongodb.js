import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas
 */
export async function connectMongoDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('ℹ️ MONGODB_URI not found in environment. Skipping MongoDB connection.');
    return;
  }

  if (uri.includes('<db_password>')) {
    console.log('⚠️ [MongoDB Atlas] Placeholder detected: Please replace <db_password> with your actual MongoDB Atlas password in server/.env');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ [MongoDB Atlas] Connected successfully to host: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error('❌ [MongoDB Atlas] Connection error:', error.message);
  }
}

export default mongoose;
