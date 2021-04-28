import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import PlacementDto from "../dtos/placement.dto";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
