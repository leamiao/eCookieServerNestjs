import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categorys/category.entity';
import { CategorysService } from 'src/categorys/categorys.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categorysRepository: Repository<Category>,
    ) {}

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product> {
        /* return this.productsRepository.findOne({
            where: {
                id: id
            }}); */
        return this.productsRepository.findOneById(id);
    }

    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
    }

    async save(product: Product) {
        if (product.imageUrl == null) {
            product.imageUrl = "1.gif";
        }
        const saved = await this.productsRepository.save(product);
        console.log("saved = ");
        console.info(saved);
        return this.findOne(saved.id);
    }

    async patch(id: number, product: Product) {
        console.log("in patch: id = " + id);
        const oldProduct = await this.findOne(id);
        console.log("find old product: ");
        console.info(oldProduct);
        if (oldProduct == null) {
            throw new NotFoundException("Could not find product by id: " + id);
        }

        if (product.name) {
            oldProduct.name = product.name;
        }

        if (product.imageUrl) {
            oldProduct.imageUrl = product.imageUrl;
        }

        if (product.price) {
            oldProduct.price = product.price;
        }

        if (product.description) {
            oldProduct.description = product.description;
        }

        const categoryId = product.categoryId;
        if (categoryId) {
            console.log("before find category: " + categoryId);
            const newCategory = await this.categorysRepository.findOneById(categoryId);
            console.log("find new category: ");
            console.info(newCategory);

            if (newCategory) {
                oldProduct.category = newCategory;
                console.info(oldProduct);
            }
        }

        oldProduct.updatedDate = new Date();

        const saved = await this.productsRepository.save(oldProduct);
        console.log("saved: ");
        console.info(saved);
        return saved;
    }

}