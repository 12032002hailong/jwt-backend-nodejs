import express from "express"
import apiController from "../controller/apiController";
import userController from '../controller/userController';
import groupController from '../controller/groupController';

const router = express.Router();

const initApiRoutes = (app) => {
    //path, handle
    //rest-api
    //POST-C, GET-R, PUT-U, DELETE-D
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get('/group/read', groupController.readFunc);

    return app.use("/api/v1", router);
}

export default initApiRoutes;