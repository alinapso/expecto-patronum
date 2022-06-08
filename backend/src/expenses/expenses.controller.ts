import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'expecto-patronum-common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateFromQuery } from 'src/Dto/apiCall';
import { ExpensesService } from './expenses.service';
@UseGuards(JwtGuard)
@Controller('expenses')
@ApiTags('Expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
  ) {}
  @Get(':id')
  getAllExpensesByPatron(
    @Param('id') id: string,
    @GetUser() user: User,
    @Query() query,
  ): any {
    const apiCall = CreateFromQuery(query);
    console.log('query', query);
    return this.expensesService.getAllExpensesByPatron(
      user,
      id,
      apiCall,
      query.endDate,
      query.startDate,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
