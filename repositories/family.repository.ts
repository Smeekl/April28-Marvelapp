import { connection } from "../app";
import Repository from "../interfaces/repository.interface";
import { Criteria } from "../entities/criteria.entity";
import { Family } from "../entities/family.entity";
import FamilyDto from "../dtos/family.dto";
import { createQueryBuilder } from "typeorm";

export class FamilyRepository implements Repository<Family> {
  public async getById(id: number): Promise<Family> {
    return this.getByField("id", id);
  }

  public async getAll(): Promise<Family[]> {
    return await createQueryBuilder(Family, "family")
      .leftJoinAndSelect("family.familyToCriteria", "familyToCriteria")
      .leftJoinAndSelect("familyToCriteria.criteria", "criteria")
      .getMany();
  }

  public async getByName(name: string): Promise<Family> {
    return this.getByField("name", name);
  }

  public async exists(family: Family): Promise<boolean> {
    const result = (await connection)
      .getRepository(Family)
      .findOne({ where: { id: family.id } });
    return !!result;
  }

  public async delete(family: Family): Promise<any> {
    return (await connection).getRepository(Family).delete({ id: family.id });
  }

  public async create(family: Family): Promise<any> {
    return (await connection).getRepository(Criteria).insert(family);
  }

  public async save(family: Family): Promise<any> {
    return (await connection).getRepository(Criteria).save(family);
  }

  public async getByField(
    field: keyof Family,
    value: number | string
  ): Promise<Family> {
    return (await connection)
      .createQueryBuilder()
      .select("family")
      .from(Family, "family")
      .where(`family.${field} = :value`, {
        value,
      })
      .getOne();
  }

  public async getByFields(fields: FamilyDto): Promise<Family> {
    return (await connection).getRepository(Family).findOne({ where: fields });
  }

  public async update(family: number | FamilyDto, user: FamilyDto) {
    return (await connection).getRepository(Family).update(family, user);
  }
}

export default FamilyRepository;
