require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const checkInRoutes = require("./routes/checkin");
const queueRoutes = require("./routes/queue");
const userRoutes = require("./routes/user");
const staffRoutes = require("./routes/staff");
const cron = require("node-cron");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://kiosk-checkin-htaax9gbc-truongntns-projects.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/checkin", checkInRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/user", userRoutes);
app.use("/api/staff", staffRoutes);

cron.schedule("*/5 * * * *", async () => {
  try {
    const response = await axios.get(process.env.BACKEND_URL);
    console.log(`Health check response: ${response.status}`);
  } catch (error) {
    console.error(`Health check error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
