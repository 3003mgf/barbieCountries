const { Router } = require('express');
const { getCountryByName, getCountry, getCountryById } = require('../controllers/countriesController');

const CountryRouter = Router();

CountryRouter.get('/', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        getCountryByName(req, res, next);
      } else {
        getCountry(req, res, next);
      }
});


CountryRouter.get('/:id', getCountryById);


module.exports = CountryRouter;