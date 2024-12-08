require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config");
const todoRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  const todoCollection = await connectToDatabase();

  // Mount routes
  app.use("/todos", todoRoutes(todoCollection));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
