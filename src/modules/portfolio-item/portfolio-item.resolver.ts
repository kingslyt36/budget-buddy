import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PortfolioItemService } from './portfolio-item.service';
import { CreatePortfolioItemInput } from './dto/create-portfolio-item.input';
import { UpdatePortfolioItemInput } from './dto/update-portfolio-item.input';

@Resolver('PortfolioItem')
export class PortfolioItemResolver {
    constructor(private readonly portfolioItemService: PortfolioItemService) {}

    @Mutation('createPortfolioItem')
    create(@Args('createPortfolioItemInput') createPortfolioItemInput: CreatePortfolioItemInput) {
        return this.portfolioItemService.create(createPortfolioItemInput);
    }

    @Query('getPortfolioItems')
    findAll() {
        return this.portfolioItemService.findAll();
    }

    @Query('getPortfolioItem')
    findOne(@Args('id') id: number) {
        return this.portfolioItemService.findOne(id);
    }

    @Mutation('updatePortfolioItem')
    update(@Args('updatePortfolioItemInput') updatePortfolioItemInput: UpdatePortfolioItemInput) {
        return this.portfolioItemService.update(updatePortfolioItemInput.id, updatePortfolioItemInput);
    }

    @Mutation('removePortfolioItem')
    remove(@Args('id') id: number) {
        return this.portfolioItemService.remove(id);
    }
}
