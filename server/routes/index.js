const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const photos = require('./photos');

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/api/photos', photos);


module.exports = router;