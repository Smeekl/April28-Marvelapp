import PlacementRepository from "../repositories/placement.repository";
import PlacementDto from "../dtos/placement.dto";
import { Placement } from "../entities/placement.entity";

class PlacementService {
  private readonly placementRepo: PlacementRepository;

  constructor() {
    this.placementRepo = new PlacementRepository();
  }

  public getAll = async () => {
    return this.placementRepo.getAll();
  };

  public create = async (placement: PlacementDto) => {
    const placementInstance = new Placement(placement);
    return this.placementRepo.create(placementInstance);
  };
}
export default PlacementService;
