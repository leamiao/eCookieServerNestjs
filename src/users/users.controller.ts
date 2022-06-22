import {Controller, Logger, Get, NotFoundException, Param, Post, Body, Delete} from "@nestjs/common"
import { UsersService } from "./users.service"
import { User } from './user.entity';

@Controller()
export class UsersController {
    logger: Logger = new Logger(UsersController.name)

    constructor(private readonly usersService : UsersService) {}

    @Get("users") // dyanmic parameter just like express, koa-router etc...
    async getUsers(
    ) {
        try {
            /*using provider's methods*/
            const users = await this.usersService.findAll();
            return users;
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    @Get("users/:userId") // dyanmic parameter just like express, koa-router etc...
    async getUser(
        /*pass the same dynamic parameter from "hello/:helloId" in 
            @Param decorator's first to let nestjs find the parameter
            correctly
        */
        @Param("userId") id: number
    ) {
        try {
            /*using provider's methods*/
            const user = await this.usersService.findOne(id);
            if(!user) throw new NotFoundException("desired `user` not found") //404 error
            return user;
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    // decorator name is similar to http verbs e.g. POST -> @Post
    @Post("users/user")
        async saveHello(
        /*Just pass the class as a type & the validation will be done automatically*/
        @Body() user: User
    ) {
        try {
            return await this.usersService.create(user)
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }

    @Delete("users/:userId") // dyanmic parameter just like express, koa-router etc...
    async deleteUser(
        /*pass the same dynamic parameter from "hello/:helloId" in 
            @Param decorator's first to let nestjs find the parameter
            correctly
        */
        @Param("userId") id: number
    ) {
        try {
            /*using provider's methods*/
            return await this.usersService.remove(id);
        } catch (error) {
            this.logger.error(error?.message ?? "");
            throw error;
        }
    }
}

