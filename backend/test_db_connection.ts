import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await sequelize.close();
  }
}

test();