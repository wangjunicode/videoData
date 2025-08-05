本地测试  node server.js

部署 
vercel --force --prod

本地部署
pm2 start server
pm2 stop server 

然后http://10.46.60.40:3000/ 即可访问
有域名可以绑定的话，就绑定域名，解析内容填10.46.60.40即可