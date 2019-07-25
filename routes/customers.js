import express from "express";
import Controller from "../controllers/customer";
import { checkJwt } from "../middleware/auth";
import { isAuthorized, scopes } from "../middleware/scope";

const router = express.Router();
const controller = new Controller();

router.get("/", checkJwt, isAuthorized(scopes.DASHBOARD), controller.get);
router.post("/", checkJwt, controller.create);
router.get("/:id", checkJwt, controller.getById);
router.put("/:id", checkJwt, controller.update);
router.delete("/:id", checkJwt, isAuthorized(scopes.ADMIN), controller.delete);

export default router;
