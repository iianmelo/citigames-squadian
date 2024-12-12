import express from "express";
import UserTableController from "./controllers/UserTableController";
import MatchesController from "./controllers/MatchesController";

const routes = express.Router();

routes.post("/user", UserTableController.create);
routes.get("/user", UserTableController.get);
routes.delete("/user/:id", UserTableController.delete);
routes.patch("/user/:id", UserTableController.update);

routes.post("/match", MatchesController.create);
routes.get("/match", MatchesController.get);
routes.delete("/match/:id", MatchesController.delete);
routes.patch("/match/:id", MatchesController.update);
routes.get("/match/:id", MatchesController.getById);

export default routes;
