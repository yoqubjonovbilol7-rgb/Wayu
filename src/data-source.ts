import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [__dirname + '/**/*.entity.js'],
    migrations: [__dirname + '/migrations/*.js'],
    synchronize: false,
});