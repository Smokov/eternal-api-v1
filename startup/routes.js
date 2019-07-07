import express from "express";
import customers from "../routes/customers";
import error from "../middleware/error";

export default function(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use("/api/v1/customers", customers);
	app.use(error);
}
