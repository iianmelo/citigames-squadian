import express from "express";
import PlayerController from "./controllers/PlayerController";
import MatchesController from "./controllers/MatchesController";
import UserController from "./controllers/UserController";

const routes = express.Router();

routes.post("/user", UserController.create);
routes.get("/user", UserController.get);
routes.delete("/user/:id", UserController.delete);
routes.patch("/user/:id", UserController.update);

routes.post("/player", PlayerController.create);
routes.get("/player", PlayerController.get);
routes.get("/player/:username", PlayerController.getByUsername);
routes.delete("/player/:id", PlayerController.delete);
routes.patch("/player/:id", PlayerController.update);

routes.post("/match", MatchesController.create);
routes.get("/match", MatchesController.get);
routes.delete("/match/:id", MatchesController.delete);
routes.patch("/match/:id", MatchesController.update);
routes.get("/match/:id", MatchesController.getById);

export default routes;
