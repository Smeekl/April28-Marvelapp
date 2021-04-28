import PlacementRepository from "../repositories/placement.repository";
import PlacementDto from "../dtos/placement.dto";
import { Placement } from "../entities/placement.entity";

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
}
export default PlacementService;
