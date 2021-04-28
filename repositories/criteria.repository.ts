import { connection } from "../app";
import Repository from "../interfaces/repository.interface";
import { Criteria } from "../entities/criteria.entity";
import CriteriaDto from "../dtos/criteria.dto";

export class CriteriaRepository implements Repository<Criteria> {
  public async getById(id: number): Promise<Criteria> {
    return this.getByField("criteriaId", id);
  }

  public async getAll(): Promise<Criteria[]> {
    return (await connection).getRepository(Criteria).find();
  }

  public async getByName(name: string): Promise<Criteria> {
    return this.getByField("name", name);
  }

  public async exists(criteria: Criteria): Promise<boolean> {
    const result = (await connection)
      .getRepository(Criteria)
      .findOne({ where: { criteriaId: criteria.criteriaId } });
    return !!result;
  }

  public async delete(criteria: Criteria): Promise<any> {
    return (await connection)
      .getRepository(Criteria)
      .delete({ criteriaId: criteria.criteriaId });
  }

  public async create(criteria: Criteria): Promise<any> {
    return (await connection).getRepository(Criteria).insert(criteria);
  }

  public async save(criteria: Criteria): Promise<any> {
    return (await connection).getRepository(Criteria).save(criteria);
  }

  public async getByField(
    field: keyof Criteria,
    value: number | string
  ): Promise<Criteria> {
    return (await connection)
      .createQueryBuilder()
      .select("criteria")
      .from(Criteria, "criteria")
      .where(`criteria.${field} = :value`, {
        value,
      })
      .getOne();
  }

  public async getByFields(fields: CriteriaDto): Promise<Criteria> {
    return (await connection)
      .getRepository(Criteria)
      .findOne({ where: fields });
  }

  public async update(criteria: number | CriteriaDto, user: CriteriaDto) {
    return (await connection).getRepository(Criteria).update(criteria, user);
  }
}

export default CriteriaRepository;
