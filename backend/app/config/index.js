require("dotenv").config(); // Nạp biến môi trường từ .env

const config = {
  app: {
    port: process.env.PORT || 3000,
  },

  db: {
    uri:
      process.env.MONGODB_URI ||
      "mongodb+srv://quanlymuonsach:thienhadenhat2@cluster0.f0nb520.mongodb.net/quanlymuonsach?retryWrites=true&w=majority&appName=Cluster0",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "SECRET_KET",
  },
};

module.exports = config;
