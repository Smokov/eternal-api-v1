import settings from "../config/settings";
import mongoose from "mongoose";
import { Customer } from "../models/customer";
import { CustomerGroup } from "../models/customerGroup";
import { User } from "../models/user";

const setupDb = async () => {
	await mongoose.connect(settings.DB_URL, { useCreateIndex: true });

	try {
		const group1 = new CustomerGroup({
			name: "Varejo",
			description: "Clientes de Varejo"
		});

		let group = await CustomerGroup.findOne({ name: group1.name });
		if (!group) {
			await group1.save();
			console.log(`Group [${group1.name}] added.`);
		} else console.log(`Group [${group1.name}] already exists.`);

		const group2 = new CustomerGroup({
			name: "Atacado",
			description: "Clientes de Atacado"
		});

		group = await CustomerGroup.findOne({ name: group2.name });
		if (!group) {
			await group2.save();
			console.log(`Group [${group2.name}] added.`);
		} else console.log(`Group [${group2.name}] already exists.`);

		const user1 = new User({
			email: "stephan.jordao@gmail.com",
			password: "123456",
			active: true,
			isAdmin: true
		});
		let user = await User.findOne({ email: user1.email });
		if (!user) {
			await user1.save();
			console.log(`User [${user1.email}] added.`);
		} else console.log(`User [${user1.email}] already exists.`);

		const customer1 = new Customer({
			user_id: user1._id,
			full_name: "Stephan Smokou",
			birth_date: new Date(1989, 10, 14).toString(),
			phone: "(11)99999-9999",
			cpf: "99999999999",
			addresses: [
				{
					address: "Avenida das Sardinhas, 899",
					city: "São Paulo",
					state: "São Paulo",
					district: "Vila Nova",
					zipcode: "12345-678"
				}
			],
			group_id: group1._id
		});
		let customer = await Customer.findOne({
			user_id: new mongoose.Types.ObjectId(customer1.user_id)
		});
		if (!customer) {
			await customer1.save();
			console.log(`Customer id: ${customer1._id} added`);
		} else console.log(`Customer ${customer1._id} already exists.`);

		const user2 = new User({
			email: "guilherme.siqueira.rodrigues@outlook.com",
			password: "123456",
			active: true,
			isAdmin: false
		});

		user = await User.findOne({ email: user2.email });
		if (!user) {
			await user2.save();
			console.log(`User [${user2.email}] added.`);
		} else console.log(`User [${user2.email}] already exists.`);

		const customer2 = new Customer({
			user_id: user2._id,
			full_name: "Guilherme Siqueira Rodrigues",
			birth_date: new Date(1988, 9, 2).toString(),
			phone: "(11)99999-9999",
			cpf: "99999999999",
			addresses: [
				{
					address: "Avenida dos sabiâs, 181",
					city: "São Paulo",
					state: "São Paulo",
					district: "Vila Guilherme",
					zipcode: "12345-678"
				}
			],
			group_id: group1._id
		});
		customer = await Customer.findOne({
			user_id: new mongoose.Types.ObjectId(customer2.user_id)
		});
		if (!customer) {
			await customer2.save();
			console.log(`Customer id: ${customer2._id} added`);
		} else console.log(`Customer ${customer2._id} already exists.`);

		const user3 = new User({
			email: "cliente.atacado@email.com",
			password: "123456",
			active: true,
			isAdmin: false
		});

		user = await User.findOne({ email: user3.email });
		if (!user) {
			await user3.save();
			console.log(`User [${user3.email}] added.`);
		} else console.log(`User [${user3.email}] already exists.`);

		const customer3 = new Customer({
			user_id: user3._id,
			full_name: "Cliente Atacado",
			birth_date: new Date(1970, 9, 2).toString(),
			phone: "(11)99999-9999",
			cpf: "99999999999",
			addresses: [
				{
					address: "Avenida das Samambaias, 988",
					city: "São Paulo",
					state: "São Paulo",
					district: "Jardim Botanico",
					zipcode: "12345-678"
				}
			],
			group_id: group2._id
		});
		customer = await Customer.findOne({
			user_id: new mongoose.Types.ObjectId(customer3.user_id)
		});
		if (!customer) {
			await customer3.save();
			console.log(`Customer id: ${customer3._id} added`);
		} else console.log(`Customer ${customer3._id} already exists.`);

		await mongoose.disconnect();
		console.log("Setup completed.");
	} catch (error) {
		console.error(error.message);
		await mongoose.disconnect();
	}
	return;
};

setupDb().catch(err => {
	console.error(err.message);
});
