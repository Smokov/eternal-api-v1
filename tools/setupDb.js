import { connect, disconnect, db } from "../src/lib/mongo";

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

const addCustomers = async conn => {
	await addCustomer(conn, {
		email: "guilherme.siqueira.rodrigues@outlook.com",
		full_name: "Guilherme",
		birthdate: new Date(1988, 9, 2).toString(),
		gender: "M",
		mobile: "99999-9999"
	});

	await addCustomer(conn, {
		email: "stephan.jordao@gmail.com",
		full_name: "Stephan",
		birthdate: new Date(1988, 10, 14).toString(),
		gender: "M",
		mobile: "99999-9999"
	});
};

const setupDb = async () => {
	await connect(true);
	if (db) {
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
