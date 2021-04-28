import { Request, Response } from "express";
import FamilyService from "../services/family.service";
import { Placement } from "../entities/placement.entity";
import PlacementService from "../services/placement.service";
import CriteriaService from "../services/criteria.service";

class PlacementController {
  private readonly placementService: PlacementService;
  constructor() {
    this.placementService = new PlacementService();
  }

  public getAll = async (request: Request, response: Response) => {
    try {
      const placements = await this.placementService.getAll();
      response.json(placements);
    } catch (err) {
      console.log(err);
    }
  };

  public create = async (request: Request, response: Response) => {
    try {
      const { name, country, arrived } = request.body;

      await this.placementService.create({
        name,
        country,
        arrived,
      });
      response.status(200).send();
    } catch (e) {
      console.log(e);
    }
  };
}
export default new PlacementController();
