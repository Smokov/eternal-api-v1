import { model, Schema } from "mongoose";
import Joi from "@hapi/joi";

export const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024
		},
		isAdmin: { type: Boolean, default: false, required: true },
		active: { type: Boolean, default: true, required: true }
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);

export function validate(user) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required(),
		active: Joi.boolean().required()
	};

	return Joi.validate(user, schema);
}
