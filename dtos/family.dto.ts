import { Criteria } from "../entities/criteria.entity";

export default class FamilyDto {
  country: string;
  name: string;
  criteria?: Criteria[];
}
