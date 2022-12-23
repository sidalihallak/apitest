import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUser1671802695644 implements MigrationInterface {
    name = 'AddRoleToUser1671802695644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
