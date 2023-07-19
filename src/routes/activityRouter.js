const { Router } = require("express");
const {getActivities, postActivity} = require("../controllers/activityController")

const ActRouter = Router();

ActRouter.get('/', getActivities);
ActRouter.post('/', postActivity);


module.exports = ActRouter;