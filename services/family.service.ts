import { connection } from "../app";
import { Family } from "../entities/family.entity";
import FamilyDto from "../dtos/family.dto";
import { FamilyToCriteria } from "../entities/familyToCriteria.entity";
import FamilyRepository from "../repositories/family.repository";
import CriteriaService from "./criteria.service";
import { createQueryBuilder, getRepository } from "typeorm";

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

  public getByQuery = async (criteria: string[], country?: string) => {
    let builder = createQueryBuilder(Family, "family")
      .leftJoinAndSelect("family.familyToCriteria", "familyToCriteria")
      .leftJoinAndSelect("familyToCriteria.criteria", "criteria");

    if (criteria.length) {
      builder = builder
        .where("criteria.name IN (:criteria)", { criteria })
        .addSelect(
          (subquery) =>
            subquery
              .select("COUNT(familyToCriteria.familyToCriteriaId)", "count")
              .from(FamilyToCriteria, "familyToCriteria")
              .where("familyToCriteria.familyId = family.id"),
          "count"
        )
        .orderBy("count", "DESC");
    }

    if (country) {
      builder = builder.andWhere("family.country = :country", { country });
    }

    return await builder.getMany();
  };

  public create = async (family: FamilyDto) => {
    const familyInstance = new Family(family);
    await getRepository(Family).insert(familyInstance);
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
