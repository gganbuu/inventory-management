import { Router } from "express";
import * as itemsController from "../controllers/itemsController.js";

const itemsRouter = Router()

itemsRouter.get("/", itemsController.homePageGet)

itemsRouter.get("/", itemController.categoriesPageGet)

itemsRouter.get("/{*splat}", itemsController.errorPageGet)


export default itemsRouter;