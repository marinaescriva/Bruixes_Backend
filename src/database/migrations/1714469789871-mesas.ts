import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Mesas1714469789871 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mesas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "numero",
                        type: "int",
                    },
                    {
                        name: "is_available",
                        type: "boolean",
                        default: true,
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mesas");
    }

}
