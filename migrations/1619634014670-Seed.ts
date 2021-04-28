import { createQueryBuilder, MigrationInterface, QueryRunner } from "typeorm";
import { Criteria } from "../entities/criteria.entity";
import CriteriaDto from "../dtos/criteria.dto";
import FamilyDto from "../dtos/family.dto";
import { Family } from "../entities/family.entity";
import { FamilyToCriteria } from "../entities/familyToCriteria.entity";

export class Seed1619634014670 implements MigrationInterface {
  private readonly criteriaPayload: CriteriaDto[] = [
    {
      name: "allergic_friendly",
      title: "Allergic Friendly",
    },
    { name: "spare_bedroom", title: "Spare Bedroom" },
    { name: "experienced", title: "Experienced" },
  ];
  private readonly familyPayload: FamilyDto[] = [
    {
      name: "Larsson",
      country: "Södermanland",
      criteria: ["allergic_friendly", "spare_bedroom", "experienced"],
    },
    { country: "Södermanland", name: "Lindgren", criteria: ["spare_bedroom"] },
    {
      name: "Gunnarson",
      country: "Stockholm",
      criteria: ["allergic_friendly"],
    },
    {
      name: "Nilsson",
      country: "Stockholm",
      criteria: ["experienced", "allergic_friendly"],
    },
    {
      name: "Glensson",
      country: "Göteborg",
      criteria: ["allergic_friendly", "spare_bedroom", "experienced"],
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const criteriaList = this.criteriaPayload.map(
      (criteria) => new Criteria(criteria)
    );

    await createQueryBuilder()
      .insert()
      .into(Criteria)
      .values(criteriaList)
      .execute();

    for (const family of this.familyPayload) {
      const { criteria } = family;
      const familyInstance = new Family(family);
      await createQueryBuilder()
        .insert()
        .into(Family)
        .values(familyInstance)
        .execute();

      const criterias = await createQueryBuilder()
        .select("criteria")
        .from(Criteria, "criteria")
        .where("criteria.name IN (:...criteria)", { criteria })
        .getMany();

      const familyToCriteria = criterias.map((criteria) => {
        return new FamilyToCriteria({
          family: familyInstance,
          criteria,
        });
      });

      await createQueryBuilder()
        .insert()
        .into(FamilyToCriteria)
        .values(familyToCriteria)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await createQueryBuilder().delete().from(FamilyToCriteria).execute();
    await createQueryBuilder().delete().from(Criteria).execute();
    await createQueryBuilder().delete().from(Family).execute();
  }
}
