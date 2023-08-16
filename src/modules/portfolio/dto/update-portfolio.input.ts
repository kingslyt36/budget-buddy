import { CreatePortfolioInput } from './create-portfolio.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePortfolioInput extends PartialType(CreatePortfolioInput) {
    id: number;
}
