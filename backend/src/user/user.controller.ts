import {
  Body,
  Controller,
  Get,
  Param,
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
import {
  UpdateUserDto,
  UpdateUserAdminDto,
} from './dto/update-user.dto';
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

  @Get(':id')
  GetUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Patch('me')
  editUserMe(
    @GetUser() user: User,
    @Body() dto: UpdateUserDto,
  ) {
    console.log(user, dto);
    return this.userService.editUser(
      user.id,
      dto,
    );
  }
  @Patch(':id')
  editUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserAdminDto,
  ) {
    return this.userService.editUser(id, dto);
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
