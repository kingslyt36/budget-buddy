import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioItemResolver } from './portfolio-item.resolver';
import { PortfolioItemService } from './portfolio-item.service';

describe('PortfolioItemResolver', () => {
    let resolver: PortfolioItemResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PortfolioItemResolver, PortfolioItemService],
        }).compile();

        resolver = module.get<PortfolioItemResolver>(PortfolioItemResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
