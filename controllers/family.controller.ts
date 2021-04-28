import { Request, Response } from "express";
import CriteriaService from "../services/criteria.service";
import FamilyService from "../services/family.service";

class FamilyController {
  private readonly criteriaService: CriteriaService;
  private readonly familyService: FamilyService;

  constructor() {
    this.criteriaService = new CriteriaService();
    this.familyService = new FamilyService();
  }

  public getAll = async (request: Request, response: Response) => {
    try {
      const families = await this.familyService.getAll();
      response.json(families);
    } catch (err) {
      console.log(err);
    }
  };

  public create = async (request: Request, response: Response) => {
    try {
      const { name, country, criteria } = request.body;
      const criteriaList = await this.criteriaService.criterionList(criteria);

      await this.familyService.create({
        name,
        country,
        criteria: criteriaList,
      });
      response.status(200).send();
    } catch (e) {
      console.log(e);
    }
  };
}
export default new FamilyController();