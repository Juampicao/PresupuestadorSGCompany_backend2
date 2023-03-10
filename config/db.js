import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://root:root@cluster0.m6jynke.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error : ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
