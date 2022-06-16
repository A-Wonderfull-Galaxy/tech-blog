const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const appRoutes =require('./app');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/app', appRoutes);

router.use((req,res)=>{
    res.status(400).end();
});

module.exports = router;