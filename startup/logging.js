import winston from "winston";

export default function() {
	winston.add(
		new winston.transports.Console({
			colorize: true,
			prettyPrint: true,
			handleExceptions: true
		})
	);
	winston.format.combine(winston.format.colorize(), winston.format.json());
}
