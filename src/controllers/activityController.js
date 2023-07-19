const { Activity, Country } = require("../db");

async function getActivities(req, res) {
  try {
    const activities = await Activity.findAll({ include: [Country] });
    
    console.log(activities)
    res.status(200).json(activities);
  } catch (error) {
    res.status(401).send(error.message);
  }
}

// CREO ACTIVIDADES :

const createActivity = async (
  name,
  dificulty,
  duration,
  seasons,
  countryId
) => {
  try {
    const newActivity = await Activity.create({
      name,
      dificulty,
      duration,
      seasons,
     
    });
    const country = await Country.findOne({
      where: {
        name: countryId,
      },
    });
    if (country) {
      await newActivity.addCountry(country);
    }  
    // const country = await Country.findByPk(countryId);
    // if (country) {
    // }  
    console.log('*********Datos posteados:', {
      name,
      dificulty,
      duration,
      seasons,
      countryId
    });

    console.log("La actividad ha sido agregada correctamente");
  } catch (error) {
    console.log(error);
  }
};

async function postActivity(req, res) {
  const { name, dificulty, duration, seasons, countryId } = req.body;

  if (name && dificulty && duration && seasons && countryId) {
    try {
      await createActivity(name, dificulty, duration, seasons, countryId);

      return res.status(200).json({
        msg: `La actividad '${name}' se creó correctamente`,
      });
    } catch (error) {
      return res.status(500).send({
        msg: "Error al crear la actividad",
      });
    }
  } else {
    return res.status(400).send({
      msg: "Por favor, completa los datos faltantes",
    });
  }
}

module.exports = {
  getActivities,
  postActivity,
};
