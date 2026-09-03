import { Router } from "express";
import * as itemsController from "../controllers/itemsController.js";

const itemsRouter = Router()

itemsRouter.get("/", itemsController.homePageGet)


export default itemsRouter;