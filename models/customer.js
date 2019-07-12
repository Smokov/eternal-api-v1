import { model, Schema } from "mongoose";
import Joi from "@hapi/joi";

export const Customer = model(
	"Customer",
	new Schema({
		user_id: {
			type: Schema.Types.ObjectId,
			required: true
		},
		full_name: {
			type: String,
			minlength: 10,
			maxlength: 50,
			required: [true, "O nome deve ser informado."]
		},
		birth_date: {
			type: Date,
			required: [true, "Data de nascimento deve ser informada."]
		},
		cpf: {
			type: String,
			length: 11,
			required: [
				function() {
					return !this.cnpj;
				},
				"CPF deve ser informado caso CNPJ não seja informado."
			]
		},
		cnpj: {
			type: String,
			length: 14,
			required: [
				function() {
					return !this.cpf;
				},
				"CNPJ deve ser informado caso CPF não seja informado."
			]
		},
		phone: {
			type: String,
			minlength: 8,
			maxlength: 20,
			required: [true, "Telefone deve ser informado."]
		},
		addresses: {
			type: [
				{
					address: { type: String, minlength: 20, maxlength: 255 },
					city: { type: String },
					state: { type: String },
					district: { type: String },
					zipcode: { type: String }
				}
			],
			required: [true, "O endereço deve ser informado."]
		},
		group_id: {
			type: Schema.Types.ObjectId
		}
	})
);

export function validate(customer) {
	const schema = {
		user_id: Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2 })
				.required(),
			password: Joi.string()
				.min(5)
				.max(1024)
				.required(),
			isAdmin: Joi.boolean().required()
		}),
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
			.min(8)
			.max(20)
			.required(),
		addresses: Joi.array().items({
			address: Joi.string().required(),
			address: { type: String, minlength: 20, maxlength: 255 },
			city: { type: String },
			state: { type: String },
			district: { type: String },
			zipcode: { type: String }
		}),
		group_id: Joi.objectId()
	};

	return Joi.validate(customer, schema);
}
