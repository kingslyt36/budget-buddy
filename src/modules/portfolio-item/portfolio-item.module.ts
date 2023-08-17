import { Module } from '@nestjs/common';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItemResolver } from './portfolio-item.resolver';

@Module({
    providers: [PortfolioItemResolver, PortfolioItemService],
})
export class PortfolioItemModule {}
