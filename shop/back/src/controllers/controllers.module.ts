import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { CategoryController } from './category/category.controller';
import { CurrencyController } from './currency/currency.controller';
import { ProductController } from './product/product.controller';
import { OrderController } from './order/order.controller';

@Module({
  imports: [ServicesModule],
  controllers: [
    CurrencyController,
    CategoryController,
    ProductController,
    OrderController,
  ],
})
export class ControllersModule {}
