const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({origin: "https://bls-countries.netlify.app"}));

server.use(router);


module.exports = server;
