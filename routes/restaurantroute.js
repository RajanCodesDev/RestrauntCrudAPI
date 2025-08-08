import express from "express";
import authmiddleware from "../middleware/authmiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
} from "../controllers/restaurantController.js";

const restrauntRouter = express.Router();

/* Routes */

//Create Restraunt
restrauntRouter.post("/create", createRestaurant);
restrauntRouter.get(
  "/getrestaurant" /* use it next time --> '/getrestaurant/:id' */,
  adminMiddleware,
  getRestaurants
);
restrauntRouter.delete("/delete/:id", authmiddleware, deleteRestaurant);

export default restrauntRouter;
