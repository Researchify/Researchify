/**
 * This file is used to configure a proxy used for development.
 *
 * @Note: This file is not being imported anywhere. It just configures a proxy that rewrites
 * requests to our REST api (i.e. /api/*) by removing the '/api' prefix.
 *
 * @see: https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
 * @see: https://github.com/chimurai/http-proxy-middleware
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
