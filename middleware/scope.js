export function isAuthorized(scope) {
	return function(req, res, next) {
		const assignedScopes = req.user.scopes;
		if (
			Array.isArray(assignedScopes) &&
			(assignedScopes.includes(scopes.ADMIN) || assignedScopes.includes(scope))
		) {
			return next();
		} else {
			return res.status(403).send("Insufficient role");
		}
	};
}

export const scopes = {
	ADMIN: "admin",
	DASHBOARD: "dashboard",
	READ_PRODUCTS: "read:products",
	WRITE_PRODUCTS: "write:products",
	READ_PRODUCT_CATEGORIES: "read:product_categories",
	WRITE_PRODUCT_CATEGORIES: "write:product_categories",
	READ_ORDERS: "read:orders",
	WRITE_ORDERS: "write:orders",
	READ_CUSTOMERS: "read:customers",
	WRITE_CUSTOMERS: "write:customers",
	READ_CUSTOMER_GROUPS: "read:customer_groups",
	WRITE_CUSTOMER_GROUPS: "write:customer_groups",
	READ_SHIPPING_METHODS: "read:shipping_methods",
	WRITE_SHIPPING_METHODS: "write:shipping_methods",
	READ_PAYMENT_METHODS: "read:payment_methods",
	WRITE_PAYMENT_METHODS: "write:payment_methods"
};
