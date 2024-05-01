import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Juegos1714469789868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "juegos",
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
                    },
                    {
                        name: "jugadores",
                        type: "int",
                    },
                    {
                        name:"inventario",
                        type:"int",
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
        await queryRunner.dropTable("juegos");
    }

}
