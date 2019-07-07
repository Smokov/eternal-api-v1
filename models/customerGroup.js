import { model, Schema } from "mongoose";
import Joi from "@hapi/joi";

export const customerGroupSchema = {
	name: {
		type: String,
		minlength: 3,
		maxlength: 100,
		required: true
	},
	description: {
		type: String,
		minlength: 10,
		maxlength: 500
	}
};

export const CustomerGroup = model(
	"CustomerGroup",
	new Schema(customerGroupSchema)
);

export function validate(customerGroup) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(100)
			.required(),
		description: Joi.string()
			.min(10)
			.max(500)
	};

	return Joi.validate(customerGroup, schema);
}
