const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const blogRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

const { route } = require('../homeRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;