import { Router } from "express";
import * as adminController from '../controllers/adminController.js'

const adminRouter = Router();

adminRouter.get("/unauthorised", adminController.unauthorisedGet)

adminRouter.get("/login", adminController.loginGet)

adminRouter.post("/login", adminController.loginPost)

adminRouter.get("/logout", adminController.logoutGet)

adminRouter.get("/create", adminController.isAuthorised, adminController.createPageGet)

adminRouter.post("/create", adminController.isAuthorised, adminController.createPagePost)

adminRouter.get("/editdelete", adminController.isAuthorised, adminController.editDeletePageGet)

adminRouter.get("/edit/:id", adminController.isAuthorised, adminController.editPageGet)

adminRouter.post("/edit/:id", adminController.isAuthorised, adminController.editPagePost)

adminRouter.post("/delete/:id", adminController.isAuthorised, adminController.deletePagePost)

//sign up routers disabled 
// adminRouter.get("/signup", adminController.signUpGet)
// adminRouter.post("/signup", adminController.signUpPost)


export default adminRouter;