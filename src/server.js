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
const axios = require("axios");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "https://kiosk-checkin.vercel.app",
      "https://kiosk-checkin-htaax9gbc-truongntns-projects.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);
app.use(express.json());

// Configuration
const WP_URL = "https://fansynails.com.au"; // Replace with your WordPress site URL
const USERNAME = "info@fansynails.com.au"; // WordPress username
const APP_PASSWORD = "Fansynails@2025"; // Application Password from WordPress
const API_BASE = `${WP_URL}/wp-json/wp/v2`; // Base URL for WordPress REST API
// Create an Axios instance with Basic Auth for Application Password
const api = axios.create({
  baseURL: API_BASE,
  auth: {
    username: USERNAME,
    password: APP_PASSWORD,
  },
});
// Function to fetch BookingPress appointments (hypothetical endpoint)
async function getBookingPressAppointments() {
  try {
    // Replace with actual BookingPress endpoint, e.g., /wp-json/bookingpress/v1/appointments
    const response = await api.get("/bookingpress_appointments"); // Hypothetical custom post type
    console.log("Appointments:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching appointments:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
// Function to create a new appointment (hypothetical)
async function createBookingPressAppointment(appointmentData) {
  try {
    // Replace with actual BookingPress endpoint for creating appointments
    const response = await api.post("/bookingpress_appointments", {
      title: appointmentData.title, // e.g., "Haircut Appointment"
      status: "publish",
      bookingpress_service: appointmentData.serviceId, // Hypothetical field
      bookingpress_date: appointmentData.date, // e.g., "2025-05-01"
      bookingpress_time: appointmentData.time, // e.g., "10:00"
      bookingpress_customer: appointmentData.customerId, // Hypothetical field
    });
    console.log("Created Appointment:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating appointment:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

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

app.get('/', async (req, res) =>  {
  await getBookingPressAppointments();
  res.send('...')
})
