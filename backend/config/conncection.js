import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function generateRandomUser(index) {
  const roles = ["admin", "user"];
  const names = [
    "Muhammad Umair",
    "Uzair",
    "Ali",
    "Ahmed",
    "Tayyab",
    "Anas",
    "Fahad",
    "Wasi",
    "Haider",
  ];
  const cities = [
    "Gujranwala",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
  ];
  const countries = ["Pakistan", "UK", "France", "Japan", "Australia"];

  const address = {
    addressLine1: `${Math.floor(Math.random() * 1000)} Main St`,
    addressLine2: `Apt ${Math.floor(Math.random() * 100)}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    state: "Example State",
    country: countries[Math.floor(Math.random() * countries.length)],
  };

  return {
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${index}@example.com`,
    addresses: [address, address],
    role: roles[Math.floor(Math.random() * roles.length)],
    phoneNo: `${Math.floor(Math.random() * 10000000000)}`,
  };
}

export const connection = (app) => {
  mongoose
    .connect(mongoURI, params)
    .then(async () => {
      console.log("Connected to the database");
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log("Seeding database with 1000 users");
        const users = [];
        for (let i = 0; i < 1000; i++) {
          const userData = generateRandomUser(i);
          const user = new User(userData);
          if (i === 0) {
            user.role = "admin";
            user.password = bcrypt.hash("admin1234", 10);
          }
          users.push(user);
        }
        await User.insertMany(users);
        console.log("Database seeding complete");
      } else {
        console.log("Database already seeded, skipping seeding process");
      }
      return app.listen(PORT, console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) =>
      console.log("Database connection error: ", error.message)
    );
};
