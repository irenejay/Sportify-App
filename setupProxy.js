// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/players',
//     createProxyMiddleware({
//       target: 'http://localhost:8001',  // Change this to the actual URL of your API server
//       changeOrigin: true,
//       pathRewrite: {
//         '^/players': '/',  // Rewrite /players to / on the target server
//       },
//     })
//   );
// };