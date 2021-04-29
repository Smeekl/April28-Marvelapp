import PlacementRepository from "../repositories/placement.repository";
import PlacementDto from "../dtos/placement.dto";
import { Placement } from "../entities/placement.entity";
import { createQueryBuilder, getManager } from "typeorm";
import { Family } from "../entities/family.entity";

class PlacementService {
  private readonly placementRepo: PlacementRepository;

  constructor() {
    this.placementRepo = new PlacementRepository();
  }

  public getAll = async () => this.placementRepo.getAll();

  public getById = async (id: number) => this.placementRepo.getById(id);

  public create = async (placement: PlacementDto) => {
    const placementInstance = new Placement(placement);
    return this.placementRepo.create(placementInstance);
  };

  public match = async (families: string[], placementId: number) => {
    const placement = await this.placementRepo.getById(placementId);
    placement.match = await createQueryBuilder()
      .select("family")
      .from(Family, "family")
      .where("family.id IN (:...ids)", { ids: families })
      .getMany();
    return await getManager().save(placement);
  };
}
export default PlacementService;
