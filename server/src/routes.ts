import express from "express";
import userController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/post", PostController.create);
routes.get("/post", PostController.get);
routes.delete("/post/:id", PostController.delete);
routes.patch("/post/:id", PostController.update);

export default routes;
