import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/item.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UsersModule, AuthModule, ItemsModule],
})
export class AppModule {}
