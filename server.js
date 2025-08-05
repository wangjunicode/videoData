const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/api/view-count', async (req, res) => {
    const bvid = req.query.bvid || 'BV1zQhjz6EsR';
    
    try {
        const response = await axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
        const stats = response.data.data.stat;
        
        res.json({
            viewCount: stats.view,     
            danmuCount: stats.danmaku, 
            likeCount: stats.like,    
            coinCount: stats.coin,     
            favoriteCount: stats.favorite, 
            shareCount: stats.share     
        });
        
    } catch (error) {
        console.error('Error fetching Bilibili data:', error);
        res.status(500).json({ 
            error: 'Failed to fetch video stats',
            details: error.message 
        });
    }
});

app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=30'); 
    next();
});

//vercel 部署的话用这个
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

//本地pm2部署的话用这个
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});