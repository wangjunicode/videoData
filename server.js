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
        const response = await axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
        const stats = response.data.data.stat;
        
        res.json({
            viewCount: stats.view,      // 播放量
            danmuCount: stats.danmaku,  // 弹幕数
            likeCount: stats.like,      // 点赞数
            coinCount: stats.coin,      // 投币数
            favoriteCount: stats.favorite, // 收藏数
            shareCount: stats.share     // 转发数
        });
        
    } catch (error) {
        console.error('Error fetching Bilibili data:', error);
        res.status(500).json({ 
            error: 'Failed to fetch video stats',
            details: error.message 
        });
    }
});

// Add cache control middleware
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=30'); // Cache for 30 seconds
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});