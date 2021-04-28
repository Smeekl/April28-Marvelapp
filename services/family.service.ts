import { connection } from "../app";
import { Family } from "../entities/family.entity";
import FamilyDto from "../dtos/family.dto";
import { FamilyToCriteria } from "../entities/familyToCriteria.entity";
import FamilyRepository from "../repositories/family.repository";

class FamilyService {
  private readonly familyRepo: FamilyRepository;

  constructor() {
    this.familyRepo = new FamilyRepository();
  }

  public getAll = async () => {
    return this.familyRepo.getAll();
  };

  public create = async (family: FamilyDto) => {
    const familyInstance = new Family(family);
    await (await connection).getRepository(Family).insert(familyInstance);

    const familyCriteria: FamilyToCriteria[] = family.criteria.map(
      (criteria) => {
        return new FamilyToCriteria({
          family: familyInstance,
          criteria,
        });
      }
    );

    return (await connection)
      .createQueryBuilder()
      .insert()
      .into(FamilyToCriteria)
      .values(familyCriteria)
      .execute();
  };
}
export default FamilyService;
