import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { UploadedFileModule } from 'src/uploaded-file/uploaded-file.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [UploadedFileModule],
})
export class ExpensesModule {}
