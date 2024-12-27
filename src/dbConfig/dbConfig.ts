import mongoose from 'mongoose';

export async function connectToMongo() {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try{
    console.log('Connecting to MongoDB.....');
    mongoose.connect(process.env.MONGODB_URI!)
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("Connected to MongoDB");
    })

    connection.on('error', (error) => {
      console.log("Error in connecting to MongoDB", + error);
      process.exit();
    })

  } catch (error){
    console.log("Something went wrong in connecting to MongoDB db");
    console.log(error);
  }
}