const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Proxy endpoint to get Bilibili video data
app.get('/api/view-count', async (req, res) => {
    const bvid = req.query.bvid || 'BV1zQhjz6EsR'; // Default video ID
    
    try {
        // Using .then() syntax for better compatibility with Node 12
        axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
            .then(response => {
                const viewCount = response.data.data.stat.view;
                res.json({ viewCount });
            })
            .catch(error => {
                console.error('Error fetching Bilibili data:', error);
                res.status(500).json({ error: 'Failed to fetch view count' });
            });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
