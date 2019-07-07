const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "eternalDb";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";
const dbCred =
	dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : "";

const PORT = process.env.PORT || 3001;

const DB_URL =
	process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

export default { PORT, DB_URL };
