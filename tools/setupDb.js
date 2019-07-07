import { connect, disconnect, db } from "../src/lib/mongo";

const addCustomerGroup = async (conn, group) => {
	const count = await conn
		.collection("customerGroups")
		.countDocuments({ name: group.name });
	const exists = +count > 0;
	if (!exists) {
		await conn.collection("customerGroups").insertOne(group);
		console.info(`- Added customer group: /${group.name}`);
	}
};

const addCustomer = async (conn, customer) => {
	const count = await conn
		.collection("customers")
		.countDocuments({ email: customer.email });
	const exists = +count > 0;
	if (!exists) {
		await conn.collection("customers").insertOne(customer);
		console.info(`- Added customer: /${customer.email}`);
	}
};

const addCustomerGroups = async conn => {
	await addCustomerGroup(conn, {
		name: "Varejo",
		description: "Clientes de varejo"
	});
	await addCustomerGroup(conn, {
		name: "Atacado",
		description: "Clientes de atacado"
	});
};

const addCustomers = async conn => {
	await addCustomer(conn, {
		email: "guilherme.siqueira.rodrigues@outlook.com",
		full_name: "Guilherme",
		birth_date: new Date(1988, 9, 2).toString(),
		phone: "99999-9999",
		cpf: "99999999999"
	});

	await addCustomer(conn, {
		email: "stephan.jordao@gmail.com",
		full_name: "Stephan",
		birth_date: new Date(1988, 10, 14).toString(),
		phone: "99999-9999",
		cpf: "99999999999"
	});
};

const setupDb = async () => {
	await connect(true);
	if (db) {
		try {
			await db.createCollection("customerGroups");
			await addCustomerGroups(db);
		} catch (e) {
			console.error("Could not create customer groups data:", e.message);
			return;
		}
		try {
			await db.createCollection("customers");
			await addCustomers(db);
		} catch (e) {
			console.error("Could not create customers data:", e.message);
			return;
		}
		try {
			await db.createCollection("categories");
		} catch (e) {
			console.error("Could not create categories data:", e.message);
			return;
		}
		try {
			await db.createCollection("products");
		} catch (e) {
			console.error("Could not create products data:", e.message);
			return;
		}
	}
	await disconnect();
	console.log("Setup completed.");
	return;
};

setupDb();
