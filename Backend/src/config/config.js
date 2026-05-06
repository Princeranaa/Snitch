import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide MONGODB_URI in .env file");
}

if (!process.env.PORT) {
  throw new Error("Please provide PORT in .env file");
}

if (!process.env.JWT_SECRET) {
  throw new Error("Please provide JWT_SECRET in .env file");
}

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};
