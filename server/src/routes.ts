import express from "express";
import userController from "./controllers/UserController";
import MatchesController from "./controllers/MatchesController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/match", MatchesController.create);
routes.get("/match", MatchesController.get);
routes.delete("/match/:id", MatchesController.delete);
routes.patch("/match/:id", MatchesController.update);
routes.get("/match/:id", MatchesController.getById);

export default routes;
