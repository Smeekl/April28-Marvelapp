import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PlacementDto from "../dtos/placement.dto";
import { Family } from "./family.entity";

@Entity("placement")
export class Placement {
  constructor(payload: PlacementDto) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  country: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  arrived: Date;

  @ManyToMany(() => Family)
  @JoinTable()
  match: Family[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
