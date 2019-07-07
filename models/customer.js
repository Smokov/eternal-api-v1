import { model, Schema } from "mongoose";
import Joi from "@hapi/joi";
import { customerGroupSchema } from "./customerGroup";

export const Customer = model(
	"Customer",
	new Schema({
		email: {
			type: String,
			maxlength: 255,
			required: true
		},
		full_name: {
			type: String,
			minlength: 10,
			maxlength: 50,
			required: true
		},
		birth_date: {
			type: Date,
			required: true
		},
		cpf: {
			type: String,
			length: 11,
			required: true
		},
		phone: {
			type: String,
			minlength: 13,
			maxlength: 14,
			required: true
		},
		group: {
			type: customerGroupSchema
		}
	})
);

export function validate(customer) {
	const schema = {
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.required(),
		full_name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		birth_date: Joi.date()
			.min("1-1-1900")
			.max("now")
			.required(),
		cpf: Joi.string()
			.regex(/^[0-9]{11}$/)
			.required(),
		phone: Joi.string()
			.min(13)
			.max(14)
			.required(),
		group_id: Joi.objectId()
	};

	return Joi.validate(customer, schema);
}
