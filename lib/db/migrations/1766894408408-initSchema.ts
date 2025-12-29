import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766894408408 implements MigrationInterface {
    name = 'InitSchema1766894408408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
    }

}
