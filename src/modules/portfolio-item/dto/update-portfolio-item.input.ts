import { CreatePortfolioItemInput } from './create-portfolio-item.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePortfolioItemInput extends PartialType(CreatePortfolioItemInput) {
    id: number;
}
