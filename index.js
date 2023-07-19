const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const { Country } = require("../server/src/db");

conn
  .sync({ force: false })
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    const validacionDB = await Country.findAll();
    if (validacionDB.length === 0) {
      axios.get("https://bls-countries.up.railway.app").then(({ data }) => {
        const countries = [];
        data.forEach((country) => {
          const newCountry = {
            id: country.cca3,
            name: country.name.common,
            flag: country.flags.png,
            continent: country.continents[0],
            capital: Array.isArray(country.capital)
              ? country.capital[0]
              : "Sin Capital",
            subregion: country.subregion ? country.subregion : "Sin subregion",
            area: country.area,
            population: country.population,
          };
          countries.push(newCountry);
        });
        Country.bulkCreate(countries)
          .then(() => {
            console.log("DB cargada correctamente");
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    }
  })
  .catch((error) => console.error(error.message));