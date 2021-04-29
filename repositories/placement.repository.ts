import { connection } from "../app";
import Repository from "../interfaces/repository.interface";
import PlacementDto from "../dtos/placement.dto";
import { Placement } from "../entities/placement.entity";
import { getRepository } from "typeorm";

export class PlacementRepository implements Repository<Placement> {
  public async getById(id: number): Promise<Placement> {
    return this.getByField("id", id);
  }

  public async getAll(): Promise<Placement[]> {
    return getRepository(Placement).find({ relations: ["match"] });
  }

  public async getByName(name: string): Promise<Placement> {
    return this.getByField("name", name);
  }

  public async exists(placement: Placement): Promise<boolean> {
    const result = (await connection)
      .getRepository(Placement)
      .findOne({ where: { id: placement.id } });
    return !!result;
  }

  public async delete(placement: Placement): Promise<any> {
    return (await connection)
      .getRepository(Placement)
      .delete({ id: placement.id });
  }

  public async create(placement: Placement): Promise<any> {
    return (await connection).getRepository(Placement).insert(placement);
  }

  public async save(placement: Placement): Promise<any> {
    return (await connection).getRepository(Placement).save(placement);
  }

  public async getByField(
    field: keyof Placement,
    value: number | string
  ): Promise<Placement> {
    return (await connection)
      .createQueryBuilder()
      .select("placement")
      .from(Placement, "placement")
      .where(`placement.${field} = :value`, {
        value,
      })
      .getOne();
  }

  public async getByFields(fields: PlacementDto): Promise<Placement> {
    return (await connection)
      .getRepository(Placement)
      .findOne({ where: fields });
  }

  public async update(placement: number | PlacementDto, user: PlacementDto) {
    return (await connection).getRepository(Placement).update(placement, user);
  }
}

export default PlacementRepository;
