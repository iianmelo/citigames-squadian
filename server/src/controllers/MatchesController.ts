import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MatchesController implements Crud {
  constructor(private readonly citi = new Citi("Match")) {}

  create = async (request: Request, response: Response) => {
    const { name, platform, date, time, description, link, matches_qtd } = request.body;

    console.log("Dados recebidos no backend:", request.body);

    const isAnyUndefined = this.citi.areValuesUndefined(
      name,
      platform,
      date,
      time,
      description,
      link,
      matches_qtd
    );
    if (isAnyUndefined) {
      console.log("Dados incompletos:", { name, platform, date, time, description, link, matches_qtd });
      return response.status(400).send({ message: "Dados incompletos" });
    }

    try {
      const newMatch = await prisma.match.create({
        data: {
          name,
          platform,
          date: new Date(date),
          time: new Date(time),
          description,
          link,
          matches_qtd,
        },
      });

      console.log("Partida criada com sucesso:", newMatch);
      return response.status(201).send(newMatch);
    } catch (error) {
      console.error("Erro ao criar a partida:", error);
      return response.status(400).send({ message: "Erro ao criar a partida" });
    }
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  getById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, value } = await this.citi.findById(id);

    return response.status(httpStatus).send(value);
  }

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, platform, date, time, description, link, matches_qtd } = request.body;

    const updatedValues = { name, platform, date, time, description, link, matches_qtd };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new MatchesController();
