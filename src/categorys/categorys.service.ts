import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategorysService {
    constructor(
        @InjectRepository(Category)
        private categorysRepository: Repository<Category>,
    ) {}
    findAll(): Promise<Category[]> {
        return this.categorysRepository.find();
    }

    findOne(id: number): Promise<Category> {
        return this.categorysRepository.findOne({
            where: {
                id: id
            }});
    }
}