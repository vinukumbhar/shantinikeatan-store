import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';

import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { UnitModule } from '../unit/unit.module';
import { CurrencyModule } from '../currency/currency.module';
import { AttributeModule } from '../attribute/attribute.module';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';

@Module({
  imports: [
    CategoryModule,
    BrandModule,
    UnitModule,
    CurrencyModule,
    AttributeModule,
    AttributeValueModule,
  ],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}