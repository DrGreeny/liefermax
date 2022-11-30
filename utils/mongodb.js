import mongoose from "mongoose";

const dbConnect = async () => {
  /*   if (mongoose.connection) {
    console.log("already connected");
    return;
  } */
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(process.env.MONGODB_URI, options);
  console.log("DB Verbindung hergestellt!");
};

async function dbDisconnect() {
  await mongoose.disconnect();
  console.log("DB Verbindung beendet");
}

const mongodb = { dbConnect, dbDisconnect };
export default mongodb;
