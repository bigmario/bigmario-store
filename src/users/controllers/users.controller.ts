import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // @Post()
  // create(@Body() payload: CreateUserDto) {
  //   return this.usersService.create(payload);
  // }

  // @Put(':id')
  // update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
  //   return this.usersService.update(id, payload);
  // }

  // @Delete(':id')
  // remove(@Param('id', MongoIdPipe) id: string) {
  //   return this.usersService.remove(id);
  // }
}
