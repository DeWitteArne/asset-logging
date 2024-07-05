import { MySQLDataSource } from './data-source';

const runMigrations = async () => {
  try {
    await MySQLDataSource.initialize();

    await MySQLDataSource.runMigrations();

    await MySQLDataSource.destroy();

    process.exit(0);
  } catch (e) {
    console.error('error while running migrations', e);

    try {
      await MySQLDataSource.destroy();
    } catch (error) {
      console.error('error closing the mysql data source', error);
    }
  }
};

runMigrations().then(() => console.log('migrations finished'));
