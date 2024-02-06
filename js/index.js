const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/university_activity_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Activity schema
const activitySchema = new mongoose.Schema({
    department: String,
    date: Date,
    startTime: String,
    endTime: String,
    description: String,
});

const Activity = mongoose.model('Activity', activitySchema);

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.post('/api/activity', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json({ message: 'Activity recorded successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to record activity.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
