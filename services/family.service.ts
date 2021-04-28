import { connection } from "../app";
import { Family } from "../entities/family.entity";
import FamilyDto from "../dtos/family.dto";
import { FamilyToCriteria } from "../entities/familyToCriteria.entity";
import FamilyRepository from "../repositories/family.repository";
import CriteriaRepository from "../repositories/criteria.repository";
import CriteriaService from "./criteria.service";

class FamilyService {
  private readonly familyRepo: FamilyRepository;
  private readonly criteriaService: CriteriaService;

  constructor() {
    this.familyRepo = new FamilyRepository();
    this.criteriaService = new CriteriaService();
  }

  public getAll = async () => {
    return this.familyRepo.getAll();
  };

  public create = async (family: FamilyDto) => {
    const familyInstance = new Family(family);
    await (await connection).getRepository(Family).insert(familyInstance);
    const criteriaList = await this.criteriaService.criterionList(
      family.criteria
    );

    const familyCriteria: FamilyToCriteria[] = criteriaList.map((criteria) => {
      return new FamilyToCriteria({
        family: familyInstance,
        criteria,
      });
    });

    return (await connection)
      .createQueryBuilder()
      .insert()
      .into(FamilyToCriteria)
      .values(familyCriteria)
      .execute();
  };
}
export default FamilyService;
