import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Reservas2014469789870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reservas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "id_usuario",
                        type: "int",
                    },
                    {
                        name: "id_mesa",
                        type: "int",
                    },
                    {
                        name: "id_juego",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "id_evento",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "fecha_hora_inicio",
                        type: "datetime",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["id_usuario"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "usuarios",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["id_mesa"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "mesas",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["id_juego"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "juegos",
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["id_evento"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "eventos",
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reservas");
    }

}
