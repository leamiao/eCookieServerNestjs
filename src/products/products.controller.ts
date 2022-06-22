import {Controller, Logger, Get, NotFoundException, Param, Post, Body, Delete, Patch} from "@nestjs/common"
import { ProductsService } from "./products.service"
import { Product } from './product.entity';

@Controller()
export class ProductsController {
    logger: Logger = new Logger(ProductsController.name)

    constructor(private readonly productsService : ProductsService) {}

    @Get("products") // dyanmic parameter just like express, koa-router etc...
    async getProducts(
    ) {
        try {
            /*using provider's methods*/
            const products = await this.productsService.findAll();
            return { "data": products,
                     relations: {
                       category: true,
                    }
                };
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    @Get("products/:productId") // dyanmic parameter just like express, koa-router etc...
    async getProduct(
        /*pass the same dynamic parameter from "hello/:helloId" in 
            @Param decorator's first to let nestjs find the parameter
            correctly
        */
        @Param("productId") id: number
    ) {
        try {
            /*using provider's methods*/
            const product = await this.productsService.findOne(id);
            if(!product) throw new NotFoundException("desired `product` not found") //404 error
            return { "data": product,
                     relations: {
                       category: true,
                     }}
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    // decorator name is similar to http verbs e.g. POST -> @Post
    @Post("products/update")
        async saveProduct(
        /*Just pass the class as a type & the validation will be done automatically*/
        @Body() product: Product
    ) {
        try {
            return {"data": await this.productsService.save(product)};
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

     // decorator name is similar to http verbs e.g. POST -> @Post
     @Patch("products/:productId")
     async patchProduct(
     /*Just pass the class as a type & the validation will be done automatically*/
     @Param("productId") id: number,
     @Body() product: Product
    ) {
        try {
            console.info(product);
    
            //product.id = id;
            console.log("id = " + id);
            return { "data": await this.productsService.patch(id, product)};
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    @Delete("products/:productId") // dyanmic parameter just like express, koa-router etc...
    async deleteProduct(
        /*pass the same dynamic parameter from "hello/:helloId" in 
            @Param decorator's first to let nestjs find the parameter
            correctly
        */
        @Param("productId") id: number
    ) {
        try {
            /*using provider's methods*/
            return { "data": await this.productsService.remove(id)};
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }
}
