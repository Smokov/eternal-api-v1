import { Customer, validate } from "../models/customer";

class CustomerController {
	constructor() {}

	async get(req, res) {
		const customers = await Customer.find().sort("full_name");
		res.send(customers);
	}

	async getById(req, res) {
		const customer = await Customer.findById(req.params.id);

		if (!customer) return res.status(404).send("Cliente não encontrado.");

		res.send(customer);
	}

	async create(req, res) {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let customer = new Customer({
			full_name: req.body.full_name,
			email: req.body.email,
			birth_date: req.body.birth_date,
			cpf: req.body.cpf,
			phone: req.body.phone,
			group: req.body.group
		});
		customer = await customer.save();

		res.send(customer);
	}

	async update(req, res) {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const customer = await Customer.findByIdAndUpdate(
			req.params.id,
			{
				full_name: req.body.full_name,
				email: req.body.email,
				birth_date: req.body.birth_date,
				cpf: req.body.cpf,
				phone: req.body.phone,
				group: req.body.group
			},
			{ new: true }
		);

		if (!customer) return res.status(404).send("Cliente não encontrado.");

		res.send(customer);
	}

	async delete(req, res) {
		const customer = await Customer.findByIdAndRemove(req.params.id);

		if (!customer) return res.status(404).send("Cliente não encontrado.");

		res.send(customer);
	}
}

export default CustomerController;
