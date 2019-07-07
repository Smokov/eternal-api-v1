import express from "express";
import winston from "winston";
import logging from "./startup/logging";
import db from "./startup/db";
import routes from "./startup/routes";

const app = express();

logging();
db();
routes(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, err => {
	if (err) winston.error(err);
	else winston.info(`Listening on port ${port}...`);
});

export default server;
