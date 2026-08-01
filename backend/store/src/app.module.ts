import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './master/brand/brand.module';
import { CompanyModule } from './master/company/company.module';
import { CurrencyModule } from './master/currency/currency.module';
import { TaxModule } from './master/tax/tax.module';
import { CategoryModule } from './master/category/category.module';
import { AttributeModule } from './master/attribute/attribute.module';
import { AttributeValueModule } from './master/attribute-value/attribute-value.module';
import { WarehouseModule } from './master/warehouse/warehouse.module';
import { LocationModule } from './master/location/location.module';
import { PaymentMethodModule } from './master/payment-method/payment-method.module';
import { PaymentTermModule } from './master/payment-term/payment-term.module';
import { ProductModule } from './catalog/product/product.module';
import { ProductPriceModule } from './catalog/product-price/product-price.module';
import { PriceListModule } from './catalog/price-list/price-list.module';
import { BarcodeModule } from './catalog/barcode/barcode.module';
import { ProductImageModule } from './catalog/product-image/product-image.module';
import { ProductImageService } from './catalog/product-image/product-image.service';
import { ProductImageController } from './catalog/product-image/product-image.controller';
import { VariantAttributeModule } from './catalog/variant-attribute/variant-attribute.module';
import { ProductVariantModule } from './catalog/product-variant/product-variant.module';
import { MasterModule } from './master/master/master.module';


@Module({
  imports: [
    PrismaModule,
    ProductModule,
    BrandModule,
    CompanyModule,
    CurrencyModule,
    TaxModule,
    CategoryModule,
    AttributeModule,
    AttributeValueModule,
    WarehouseModule,
    LocationModule,
    PaymentMethodModule,
    PaymentTermModule,
    ProductVariantModule,
    VariantAttributeModule,
    ProductImageModule,
    BarcodeModule,
    PriceListModule,
    ProductPriceModule,
    MasterModule,
  ],
  controllers: [AppController, ProductImageController],
  providers: [AppService, ProductImageService],
})
export class AppModule {}