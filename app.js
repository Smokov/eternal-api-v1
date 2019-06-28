import express from "express";
import winston from "winston";
import logging from "./startup/logging";

const app = express();

// Add routes
logging();
// Add Db

const port = process.env.PORT || 3001;
const server = app.listen(port, err => {
	if (err) winston.error(err);
	else winston.info(`Listening on port ${port}...`);
});

export default server;
