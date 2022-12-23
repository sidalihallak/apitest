import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDataType1671793637676 implements MigrationInterface {
    name = 'ChangeDataType1671793637676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resume\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`resume\` ADD \`data\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resume\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`resume\` ADD \`data\` json NULL`);
    }
}
