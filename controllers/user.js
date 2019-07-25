import { User, validate } from "../models/user";
import bcrypt from "bcrypt";

class UserController {
	constructor() {}

	async get(req, res, next) {
		try {
			const query = {};
			if (req.query.email) query.email = req.query.email;
			if (req.query.roles) query.roles = { $all: req.query.roles };
			const users = await User.find(query).select("-hash");
			res.send(users);
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const user = await User.findById(req.params.id).select("-hash");
			if (!user) return res.status(404).send("Usuário não encontrado.");
			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			const { email, password, roles } = req.body;

			let user = await User.findOne({ email: email });
			if (user) return res.status(400).send("Usuário já registrado.");

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			user = new User({
				email: email,
				hash: hash,
				roles: roles
			});

			user = await user.save();

			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			const { email, password } = req.body;

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const user = await User.findByIdAndUpdate(
				req.params.id,
				{
					email: email,
					hash: hash
				},
				{ new: true }
			);

			if (!user) return res.status(404).send("Usuário não encontrado.");

			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const user = await User.findByIdAndRemove(req.params.id);

			if (!user) return res.status(404).send("Usuário não encontrado.");

			res.send(user);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
