import { Request, Response } from "express";
import CriteriaService from "../services/criteria.service";

class CriteriaController {
  private readonly criteriaService: CriteriaService;
  constructor() {
    this.criteriaService = new CriteriaService();
  }

  public getAll = async (request: Request, response: Response) => {
    try {
      const criteria = await this.criteriaService.getAll();
      response.json(criteria);
    } catch (err) {
      console.log(err);
    }
  };

  public create = async (request: Request, response: Response) => {
    try {
      const { name } = request.body;
      await this.criteriaService.create({ name });

      response.status(200).send();
    } catch (e) {
      console.log(e);
    }
  };
}
export default new CriteriaController();
