import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'expecto-patronum-common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
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

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
