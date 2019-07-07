import winston from "winston";

export default function(error, req, res, next) {
	winston.error(error);

	const { statusCode, message, errors } = error;

	res.status(statusCode || 500).json({ message, errors });
}
