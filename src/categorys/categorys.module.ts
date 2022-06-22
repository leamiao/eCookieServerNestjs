import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorysService],
  controllers: [CategorysController],
})
export class CategorysModule {}
