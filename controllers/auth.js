import { User, validateAuth, validate } from "../models/user";

class AuthenticationController {
	// Change to Auth server call
	async signIn(req, res, next) {
		const { error } = validateAuth(req.body);
		const { email, password } = req.body;

		if (error) return res.status(400).send(error.details[0].message);

		let user = await User.findOne({ email: email });
		if (!user) return res.status(400).send("Invalid email or password.");

		const validPassword = await bcrypt.compare(password, user.hash);
		if (!validPassword)
			return res.status(400).send("Invalid email or password.");

		const token = user.generateAuthToken();

		res.send(token);
	}

	// Change to Auth server call
	async signUp(req, res, next) {
		try {
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			const { email, password } = req.body;

			let user = await User.findOne({ email: email });
			if (user) return res.status(400).send("Usuário já registrado.");

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			user = new User({
				email: email,
				hash: hash,
				roles: []
			});

			user = await user.save();

			res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async authenticateGoogle(req, res, next) {}
	async authenticateFacebook(req, res, next) {}
	async authenticateTwitter(req, res, next) {}
}

export default AuthenticationController;
