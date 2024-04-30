import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReservasMesas1714469789872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reservas_mesas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "id_mesa",
                        type: "int",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["id_mesa"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "mesas",
                        onDelete: "CASCADE",
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reservas_mesas");
    }

}
