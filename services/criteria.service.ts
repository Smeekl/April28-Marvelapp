import { connection } from "../app";
import { Criteria } from "../entities/criteria.entity";
import CriteriaRepository from "../repositories/criteria.repository";
import CriteriaDto from "../dtos/criteria.dto";

class CriteriaService {
  private readonly criteriaRepo: CriteriaRepository;

  constructor() {
    this.criteriaRepo = new CriteriaRepository();
  }

  public create = async (criteria: CriteriaDto) => {
    const criteriaInstance = new Criteria(criteria);
    return this.criteriaRepo.create(criteriaInstance);
  };

  public getAll = async () => {
    return this.criteriaRepo.getAll();
  };

  public criterionList = async (criteria: string[]) => {
    if (criteria.length <= 0) {
      return null;
    }

    return (await connection)
      .createQueryBuilder()
      .select("criteria")
      .from(Criteria, "criteria")
      .where("criteria.name IN (:...criteria)", { criteria })
      .getMany();
  };
}
export default CriteriaService;
