import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FamilyToCriteria } from "./familyToCriteria.entity";
import CriteriaDto from "../dtos/criteria.dto";

@Entity("criteria")
export class Criteria {
  constructor(payload: CriteriaDto) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  public criteriaId: number;

  @Column({ type: "varchar", length: 255 })
  public name: string;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @OneToMany(
    () => FamilyToCriteria,
    (familyToCriteria) => familyToCriteria.family
  )
  public familyToCriteria!: FamilyToCriteria[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
