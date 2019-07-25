import jwt from "express-jwt";
import settings from "../config/settings";
//import jwksRsa from "jwks-rsa"; // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint

// passport socials

// passport jwt OR custom jwt
export const checkJwt = jwt({
	// Dynamically provide a signing key based on the kid in the header
	// and the signing keys provided by the JWKS endpoint.
	secret: settings.JWT_PRIVATE_KEY,

	// Validate the audience and the issuer.
	audience: settings.AUTH_AUDIENCE,
	issuer: `https://${settings.AUTH_DOMAIN}/`,

	// This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
	algorithms: ["RS256"]
});

export const isAuthenticated = (req, res, next) => {
	// get token from authentication header (bearer).
	// decode token.
	// grab user from DB.
	// decorate the req with the user.
};
