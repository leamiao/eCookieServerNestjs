import {Controller, Logger, Get, NotFoundException, Param, Post, Body, Delete, Patch} from "@nestjs/common"
import { CategorysService } from "./categorys.service"
import { Category } from './category.entity';

@Controller()
export class CategorysController {
    logger: Logger = new Logger(CategorysController.name)

    constructor(private readonly categoriesService : CategorysService) {}

    @Get("categories") // dyanmic parameter just like express, koa-router etc...
    async getCategorys(
    ) {
        try {
            /*using provider's methods*/
            const categories = await this.categoriesService.findAll();
            return { "data": categories};
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    @Get("categories/:categoryId") // dyanmic parameter just like express, koa-router etc...
    async getCategory(
        /*pass the same dynamic parameter from "hello/:helloId" in 
            @Param decorator's first to let nestjs find the parameter
            correctly
        */
        @Param("categoryId") id: number
    ) {
        try {
            /*using provider's methods*/
            const category = await this.categoriesService.findOne(id);
            if(!category) throw new NotFoundException("desired `category` not found") //404 error
            return { "data": category}
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }
}