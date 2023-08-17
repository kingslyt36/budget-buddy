import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';

@Resolver('Portfolio')
export class PortfolioResolver {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Mutation('createPortfolio')
    create(@Args('createPortfolioInput') createPortfolioInput: CreatePortfolioInput) {
        return this.portfolioService.create(createPortfolioInput);
    }

    @Query('getPortfolios')
    findAll() {
        return this.portfolioService.findAll();
    }

    @Query('getPortfolio')
    findOne(@Args('id') id: number) {
        return this.portfolioService.findOne(id);
    }

    @Mutation('updatePortfolio')
    update(@Args('updatePortfolioInput') updatePortfolioInput: UpdatePortfolioInput) {
        return this.portfolioService.update(updatePortfolioInput.id, updatePortfolioInput);
    }

    @Mutation('removePortfolio')
    remove(@Args('id') id: number) {
        return this.portfolioService.remove(id);
    }
}
