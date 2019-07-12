import { User, validate } from "../models/user";
import bcrypt from "bcrypt";

class UserController {
	constructor() {}

	async authenticate(req, res, next) {
		try {
			const user = await User.findOne({ email: req.params.email });
			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async getByEmail(req, res, next) {
		try {
			const user = await User.findOne({ email: req.params.email });

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

			let user = await User.findOne({ email: req.body.email });
			if (user) return res.status(400).send("Usuário já registrado.");

			user = new User({
				email: req.body.email,
				password: req.body.password,
				isAdmin: false,
				active: true
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

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

			const user = await User.findByIdAndUpdate(
				req.params.id,
				{
					email: req.body.email,
					password: req.body.password,
					active: req.body.active
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
