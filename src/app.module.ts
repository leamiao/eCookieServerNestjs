import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategorysModule } from './categorys/categorys.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '$2a$10%RPJ$Vqt&',
    database: 'ecookie',
    logging: false,
    //entities: [User],
    autoLoadEntities: true,
    synchronize: false // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  }), UsersModule, ProductsModule, CategorysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
