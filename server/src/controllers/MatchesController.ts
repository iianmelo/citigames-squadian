import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class MatchesController implements Crud {
  constructor(private readonly citi = new Citi("Match")) {}
  create = async (request: Request, response: Response) => {
    const { name, platform, date, time, description, link, matches_qtd } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      name,
      platform,
      date,
      time,
      description,
      link,
      matches_qtd
    );
    if (isAnyUndefined) return response.status(400).send();

    const newMatch = {  name, platform, date, time, description, link, matches_qtd };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newMatch);

    return response.status(httpStatus).send({ message });
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
