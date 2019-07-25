import express from "express";
import Controller from "../controllers/user";
import { checkJwt } from "../middleware/auth";
import { isAuthorized, scopes } from "../middleware/scope";

const router = express.Router();
const controller = new Controller();

router.get("/", checkJwt, isAuthorized(scopes.ADMIN), controller.get);
router.get("/me", checkJwt, controller.get);
router.post("/", checkJwt, isAuthorized(scopes.ADMIN), controller.create);
router.get("/:id", checkJwt, controller.getById);
router.put("/:id", checkjwt, isAuthorized(scopes.ADMIN), controller.update);
router.delete("/:id", checkJwt, isAuthorized(scopes.ADMIN), controller.delete);

export default router;
