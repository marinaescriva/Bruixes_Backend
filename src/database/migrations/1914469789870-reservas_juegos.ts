import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class ReservasJuegos1914469789870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reservas_juegos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "id_juego",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
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
        await queryRunner.dropTable("reservas_juegos");
    }

}

