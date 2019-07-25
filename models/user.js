import { model, Schema } from "mongoose";
import Joi from "@hapi/joi";
import settings from "../config/settings";

export const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true,
			lowercase: true
		},
		hash: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024
		},
		roles: { type: [{ type: String }] },
		active: { type: Boolean, default: true, required: true }
	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{ sub: this._id, roles: this.roles },
		settings.JWT_PRIVATE_KEY
	);
	return token;
};

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
		roles: Joi.array().items(Joi.string()),
		active: Joi.boolean().required()
	};

	return Joi.validate(user, schema);
}

export function validateAuth(user) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};

	return Joi.validate(user, schema);
}
