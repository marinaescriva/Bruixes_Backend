import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Inventario1714469789868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "inventario",
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
                        name: "cantidad",
                        type: "int",
                    },
                    {
                        name: "jugadores",
                        type: "int",
                    },
                    {
                        name: "id_juego",
                        type: "int",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["id_juego"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "juegos",
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("inventario");
    }

}
