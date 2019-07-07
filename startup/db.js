import mongoose from "mongoose";
import settings from "../config/settings";
import winston from "winston";

const onClose = () => {
	winston.info("MongoDB connection was closed.");
};

const onReconnected = () => {
	winston.info("MongoDB reconnected.");
};

const onDisconnected = () => {
	winston.info("MongoDB has disconnected.");
};

const onError = error => {
	winston.error(`MongoDB connection error: ${error}`);
};

export default async () => {
	try {
		await mongoose.connect(settings.DB_URL, {
			useNewUrlParser: true,
			autoReconnect: true,
			reconnectTries: 3600,
			reconnectInterval: 1000
		});
		mongoose.connection.on("close", onClose);
		mongoose.connection.on("reconnected", onReconnected);
		mongoose.connection.on("disconnected", onDisconnected);
		mongoose.connection.on("error", onError);
		winston.info("MongoDB connected successfully.");
	} catch (error) {
		winston.error(`MongoDB connection failed: ${error.message}`);
	}
};
