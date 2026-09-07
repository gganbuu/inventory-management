import { Router } from "express";
import * as itemsController from "../controllers/itemsController.js";

const itemsRouter = Router()

itemsRouter.get("/", itemsController.homePageGet)

itemsRouter.get("/categories", itemsController.categoriesPageGet)

itemsRouter.get("/products", itemsController.productsPageGet)

itemsRouter.get("/{*splat}", itemsController.errorPageGet)


export default itemsRouter;