const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); 

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

const queueRoutes = require('./routes/queueRoutes');
app.use('/api/queue', queueRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes')
app.use('/api/appointments', require('./routes/appointmentRoutes'));

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
