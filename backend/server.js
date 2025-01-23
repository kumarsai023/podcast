// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const podcastRoutes = require('./routes/podcastRoutes');
const bodyParser = require('body-parser');
const PodModel = require('./models/Podcast');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/podcasts', podcastRoutes);
app.use('/auth',authRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
