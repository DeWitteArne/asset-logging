import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AccessedLog1720017371920 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accessed_logs');
    await queryRunner.dropIndex('accessed_logs', 'idx-log_id');
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accessed_logs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'log_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'access_time',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['log_id'],
            referencedTableName: 'logs',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    // index because the typeorm finds all by log_id
    // singular index
    await queryRunner.createIndex(
      'accessed_logs',
      new TableIndex({
        name: 'idx_log_id',
        columnNames: ['log_id'],
      }),
    );
  }
}
