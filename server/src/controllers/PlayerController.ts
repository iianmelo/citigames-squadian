import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Citi, Crud } from "../global";

const prisma = new PrismaClient();

class PlayerController implements Crud {
  constructor(private readonly citi = new Citi("Player")) {}

  create = async (request: Request, response: Response) => {
    const { username, email } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(username, email);
    if (isAnyUndefined) return response.status(400).send();

    const newUserTable = { username, email };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newUserTable);

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();
    return response.status(httpStatus).send(values);
  };

  getByUsername = async (request: Request, response: Response) => {
    const { username } = request.params;

    const { httpStatus, value } = await this.citi.findByField("username", username);

    return response.status(httpStatus).send(value);
  }

  addPlayer = async (request: Request, response: Response) => {
    const { matchId, playerId } = request.body;

    try {
      await prisma.match.update({
        where: { id: Number(matchId) },
        data: {
          users: {
            connect: { id: Number(playerId) },
          },
        },
      });
      return response.status(200).send({ message: "Player added to match" });
    } catch (error) {
      return response.status(400).send({ message: "Error adding player to match" });
    }
  };

  removePlayer = async (request: Request, response: Response) => {
    const { matchId, playerId } = request.body;

    try {
      await prisma.match.update({
        where: { id: Number(matchId) },
        data: {
          users: {
            disconnect: { id: Number(playerId) },
          },
        },
      });
      return response.status(200).send({ message: "Player removed from match" });
    } catch (error) {
      return response.status(400).send({ message: "Error removing player from match" });
    }
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { username, email } = request.body;

    const updatedValues = { username, email };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}
  export default new PlayerController();
