import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Family } from "./family.entity";
import { Criteria } from "./criteria.entity";

@Entity("families_criterias")
export class FamilyToCriteria {
  constructor(payload: any) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  public familyToCriteriaId!: number;

  @ManyToOne(() => Family, (family) => family.familyToCriteria)
  public family!: Family;

  @ManyToOne(() => Criteria, (criteria) => criteria.familyToCriteria)
  public criteria!: Criteria;

  @Column({ type: "varchar", length: 255, default: "true" })
  value!: string;
}
