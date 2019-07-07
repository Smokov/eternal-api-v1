import Controller from "../controllers/customer";
import express from "express";

const router = express.Router();
const controller = new Controller();

router.get("/", controller.get);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
