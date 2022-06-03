import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'expecto-patronum-common';
import {
  ApiCallDto,
  CreateFromQuery,
} from 'src/Dto/apiCall';
import { GetUser } from '../auth/decorator';
import {
  AdminGuard,
  JwtGuard,
} from '../auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

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
    @GetUser('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.editUser(userId, dto);
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
