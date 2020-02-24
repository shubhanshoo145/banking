module.exports = (router) => {
  router.get('/ping', (req, res) => {
    res.json({ ping: 'pong' });
  });
};