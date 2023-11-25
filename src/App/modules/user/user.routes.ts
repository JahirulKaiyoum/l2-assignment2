import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.put('/:userId/orders', UserController.addSingleProduct);
export const UserRoutes = router;