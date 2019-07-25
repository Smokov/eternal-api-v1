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

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "mySecretKey";
const AUTH_DOMAIN = process.env.AUTH_DOMAIN || "localhost"; // eternaljoias.auth0.com
const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE || "http://localhost:3001";

export default { PORT, DB_URL, JWT_PRIVATE_KEY, AUTH_DOMAIN, AUTH_AUDIENCE };
