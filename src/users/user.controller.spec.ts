import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService(null);
    
    usersController = new UsersController(usersService);
  });

  it('should return user N1', async() => {
    const result: User = new User();
    result.name = "N1";

    jest.spyOn(usersService, 'findOne').mockImplementation((): Promise<User> => Promise.resolve(result)); 

    expect(await usersController.getUser(7)).toBe(result);
  });

  it('should return null user', async() => {
    const result: User = new User();
    result.name = "N1";

    jest.spyOn(usersService, 'findOne').mockImplementation((): Promise<User> => Promise.resolve(null)); 

    expect(usersController.getUser(7)).rejects.toThrow(
        NotFoundException
      );
  });

  it('should return all users', async() => {
    const result : User[] = [];

    jest.spyOn(usersService, 'findAll').mockImplementation((): Promise<User[]> => {
        return Promise.resolve(result);
    }); 

    expect(await usersController.getUsers).toBe(result);
  });
})


