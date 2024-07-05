import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Log1720017355857 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('logs');
    await queryRunner.dropIndex('logs', 'idx_asset_user_id');
    await queryRunner.dropIndex('logs', 'idx_asset_type');
    await queryRunner.dropIndex('logs', 'idx_user_id');
    await queryRunner.dropIndex('logs', 'idx_asset_id');
    await queryRunner.dropIndex('logs', 'idx_updated_at');
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'logs',
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
            name: 'asset_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'asset_type',
            type: 'enum',
            isNullable: false,
            enum: ['coin', 'stock', 'fund', 'indices'],
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
    );

    // index because of the use of both user_id and asset_id in FindOneByUserAndAsset
    // composed index
    await queryRunner.createIndex(
      'logs',
      new TableIndex({
        name: 'idx_asset_user_id',
        columnNames: ['asset_id', 'user_id'],
      }),
    );

    // index because asset_type is used for filtering in findPopularLogs
    // singular index
    await queryRunner.createIndex(
      'logs',
      new TableIndex({
        name: 'idx_asset_type',
        columnNames: ['asset_type'],
      }),
    );

    // index because of the frequent use of findAllByUser
    // singular index
    await queryRunner.createIndex(
      'logs',
      new TableIndex({
        name: 'idx_user_id',
        columnNames: ['user_id'],
      }),
    );

    // index because the use of grouping logs based on the asset_id
    // singular index
    await queryRunner.createIndex(
      'logs',
      new TableIndex({
        name: 'idx_asset_id',
        columnNames: ['asset_id'],
      }),
    );

    // index because the use of updated_at to sort and to filter in FindAllByUser and FindPopularLogs
    // singular index
    await queryRunner.createIndex(
      'logs',
      new TableIndex({
        name: 'idx_updated_at',
        columnNames: ['updated_at'],
      }),
    );
  }
}
