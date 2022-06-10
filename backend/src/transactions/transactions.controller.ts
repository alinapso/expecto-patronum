import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  AdminGuard,
  JwtGuard,
} from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { User } from 'expecto-patronum-common';
import { CreateFromQuery } from 'src/Dto/apiCall';
@UseGuards(JwtGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  create(
    @Body()
    createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(
      createTransactionDto,
    );
  }

  @Get()
  findAll(@GetUser() user: User, @Query() query) {
    const apiCall = CreateFromQuery(query);
    return this.transactionsService.findAll(
      user,
      apiCall,
      query.endDate,
      query.startDate,
    );
  }
  @UseGuards(AdminGuard)
  @Get('user/:id')
  findAllByUser(
    @Param('id') id: string,
    @Query() query,
    @GetUser() user: User,
  ) {
    const apiCall = CreateFromQuery(query);
    return this.transactionsService.findAllByUser(
      id,
      user,
      apiCall,
      query.endDate,
      query.startDate,
    );
  }

  @Get('sponsored/:id')
  findAllBySponsored(
    @Param('id') id: string,
    @Query() query,
    @GetUser() user: User,
  ) {
    const apiCall = CreateFromQuery(query);
    return this.transactionsService.findAllBySponsored(
      id,
      user,
      apiCall,
      query.endDate,
      query.startDate,
    );
  }
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
  // @UseGuards(AdminGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionsService.update(
  //     id,
  //     updateTransactionDto,
  //   );
  // }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
