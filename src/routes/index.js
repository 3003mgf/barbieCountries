const {Router} = require('express');
const CountryRouter = require('./countryRouter');
const ActRouter = require('./activityRouter');

const router = Router();

router.use('/countries', CountryRouter);
router.use('/activities', ActRouter);

module.exports = router;