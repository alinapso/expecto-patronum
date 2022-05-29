import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'expecto-patronum-common';
import {
  ApiCallDto,
  CreateFromQuery,
} from 'src/Dto/apiCall';
import { PaginationDto } from 'src/Dto/pagination';
import { GetUser } from '../auth/decorator';
import {
  AdminGuard,
  JwtGuard,
} from '../auth/guard';
import { UpdateUserDto } from '../generatedDtos/user/dto/update-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
  @UseGuards(AdminGuard)
  @Post()
  postPatrons(@Body() apiCall: ApiCallDto<any>) {
    console.log(apiCall);
    return this.userService.getUsers(apiCall);
  }

  @UseGuards(AdminGuard)
  @Get()
  getPatrons(@Query() query) {
    console.log(query);

    const apiCall = CreateFromQuery(query);
    console.log(apiCall);
    return this.userService.getUsers(apiCall);
  }
}
