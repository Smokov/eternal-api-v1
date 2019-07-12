import { Customer, validate } from "../models/customer";

class CustomerController {
	constructor() {}

	async get(req, res, next) {
		try {
			const query = {};
			if (req.query.full_name) query.full_name = req.query.full_name;
			if (req.query.cpf) query.cpf = req.query.cpf;
			if (req.query.cnpj) query.cnpj = req.query.cnpj;
			if (req.query.group_id) query.group_id = req.query.group_id;

			const customers = await Customer.find(query).sort("full_name");
			res.send(customers);
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const customer = await Customer.findById(req.params.id);

			if (!customer) return res.status(404).send("Cliente não encontrado.");

			res.send(customer);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			let customer = await Customer.findOne({ user_id: req.body.user_id });
			if (customer) return res.status(400).send("Cliente jâ registrado.");

			customer = new Customer({
				user_id: req.body.user_id,
				full_name: req.body.full_name,
				birth_date: req.body.birth_date,
				cpf: req.body.cpf,
				cnpj: req.body.cnpj,
				phone: req.body.phone,
				addresses: req.body.addresses,
				group_id: req.body.group_id
			});

			customer = await customer.save();

			res.send(customer);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			const customer = await Customer.findByIdAndUpdate(
				req.params.id,
				{
					user_id: req.body.user_id,
					full_name: req.body.full_name,
					birth_date: req.body.birth_date,
					cpf: req.body.cpf,
					cnpj: req.body.cnpj,
					phone: req.body.phone,
					addresses: req.body.addresses,
					group_id: req.body.group_id
				},
				{ new: true }
			);

			if (!customer) return res.status(404).send("Cliente não encontrado.");

			res.send(customer);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const customer = await Customer.findByIdAndRemove(req.params.id);

			if (!customer) return res.status(404).send("Cliente não encontrado.");

			res.send(customer);
		} catch (error) {
			next(error);
		}
	}
}

export default CustomerController;
