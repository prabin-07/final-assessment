const mongoose = require("mongoose");

// MongoDB Connection
mongoose
  .connect("mongodb+srv://username:password@cluster0.stsw4qu.mongodb.net/blogapp") // Replace with your MongoDB URI
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

module.exports = mongoose;