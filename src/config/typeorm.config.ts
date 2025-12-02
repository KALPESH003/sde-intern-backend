import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Item } from '../items/item.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5433),
  username: process.env.DB_USERNAME || 'nest',
  password: process.env.DB_PASSWORD || 'nest123',
  database: process.env.DB_NAME || 'sde_intern_backend',
  entities: [User, Item],
  synchronize: true, // for demo; use migrations in prod
  logging: false
};

export default config;