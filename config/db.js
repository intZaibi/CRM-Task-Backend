import mongoose from 'mongoose';

export default async function(DB_URL) {
  try {

    await mongoose.connect(DB_URL);
    console.log("Db Connected...");
    
  } catch (error) {
    console.log(error);
    // return new error
  }
}
