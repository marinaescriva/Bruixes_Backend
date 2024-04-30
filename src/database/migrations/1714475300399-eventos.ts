import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Eventos1714475300399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "eventos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nombre",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "players",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "fecha",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "info",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("eventos");
    }

}
