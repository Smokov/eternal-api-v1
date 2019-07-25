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
					address: {
						type: String,
						minlength: 20,
						maxlength: 255,
						required: true
					},
					city: { type: String, required: true },
					state: { type: String, required: true },
					district: { type: String },
					zipcode: { type: String, required: true }
				}
			],
			required: [true, "O endereço deve ser informado."]
		},
		total_spent: { type: Number },
		orders_count: { type: Number },
		group_id: {
			type: Schema.Types.ObjectId
		}
	})
);

export function validate(customer) {
	const schema = {
		user_id: Joi.objectId(),
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
			.without("cnpj"),
		//.when("cnpj",{is:Joi.exist(),then: Joi.required()}),
		cnpj: Joi.string()
			.regex(/^[0-9]{14}$/)
			.without("cpf"),
		phone: Joi.string()
			.min(8)
			.max(20)
			.required(),
		addresses: Joi.array()
			.items({
				address: Joi.string()
					.min(20)
					.max(255)
					.required(),
				city: Joi.string().required(),
				state: Joi.string().required(),
				district: Joi.string(),
				zipcode: Joi.string().regex(/^[0-9]{5}-[0-9]{3}$/)
			})
			.required(),
		group_id: Joi.objectId()
	};

	return Joi.validate(customer, schema);
}
