const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

async function getCountry(req, res) {
  try {
    const countries = await Country.findAll({ include: [Activity] });
    console.log(countries);
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function getCountryById(req, res) {
  const id = req.params.id.toUpperCase();
  try {
    const country = await Country.findByPk(id, {
      attributes: { exclude: ["CountryActivity"] },
      include: [Activity],
    });
    return res.status(200).json(country);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function getCountryByName(req, res) {
  const { name } = req.query;
  try {
    const countriesByName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (countriesByName.length !== 0) {
      return res.status(200).json(countriesByName);
    }
    return res.status(404).send("El pais no existe en la base de datos");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getCountry,
  getCountryById,
  getCountryByName,
};
