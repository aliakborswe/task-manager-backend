const router = require('express').Router();

router.get('/a', (_req, res) => {
  res.send('hello');
})

module.exports = router;