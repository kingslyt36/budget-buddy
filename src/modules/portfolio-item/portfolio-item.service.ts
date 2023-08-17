import { Injectable } from '@nestjs/common';
import { CreatePortfolioItemInput } from './dto/create-portfolio-item.input';
import { UpdatePortfolioItemInput } from './dto/update-portfolio-item.input';

@Injectable()
export class PortfolioItemService {
    create(createPortfolioItemInput: CreatePortfolioItemInput) {
        return 'This action adds a new portfolioItem';
    }

    findAll() {
        return `This action returns all portfolioItem`;
    }

    findOne(id: number) {
        return `This action returns a #${id} portfolioItem`;
    }

    update(id: number, updatePortfolioItemInput: UpdatePortfolioItemInput) {
        return `This action updates a #${id} portfolioItem`;
    }

    remove(id: number) {
        return `This action removes a #${id} portfolioItem`;
    }
}
