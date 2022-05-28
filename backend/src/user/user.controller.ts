import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'expecto-patronum-common';
import { ApiCallDto } from 'src/Dto/apiCall';
import { PaginationDto } from 'src/Dto/pagination';
import { GetUser } from '../auth/decorator';
import {
  AdminGuard,
  JwtGuard,
} from '../auth/guard';
import { UpdateUserDto } from '../generatedDtos/user/dto/update-user.dto';
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
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
  @UseGuards(AdminGuard)
  @Post()
  getPatrons(@Body() apiCall: ApiCallDto<any>) {
    console.log(apiCall);
    return this.userService.getUsers(apiCall);
  }
}
