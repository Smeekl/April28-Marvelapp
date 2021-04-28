import {
  AfterInsert,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import FamilyDto from "../dtos/family.dto";
import { Criteria } from "./criteria.entity";
import { FamilyToCriteria } from "./familyToCriteria.entity";

@Entity("family")
export class Family {
  constructor(payload: FamilyDto) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: "varchar", length: 255 })
  // @AfterInsert()
  // updateDates() {
  //   this.familyId = "F" + this.id;
  // }
  // familyId: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  country: string;

  @OneToMany(
    () => FamilyToCriteria,
    (familyToCriteria) => familyToCriteria.family
  )
  public familyToCriteria!: FamilyToCriteria[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
