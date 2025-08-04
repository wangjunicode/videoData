const axios = require('axios');

module.exports = async (req, res) => {
    const bvid = req.query.bvid || 'BV1zQhjz6EsR';
    
    try {
        const response = await axios.get(
            `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
        );
        res.json({ 
            viewCount: response.data.data.stat.view 
        });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch view count' 
        });
    }
};
