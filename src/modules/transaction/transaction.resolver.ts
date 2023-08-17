import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver('Transaction')
export class TransactionResolver {
    constructor(private readonly transactionService: TransactionService) {}

    @Mutation('createTransaction')
    create(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput) {
        return this.transactionService.create(createTransactionInput);
    }

    @Query('getTransactions')
    findAll() {
        return this.transactionService.findAll();
    }

    @Query('getTransaction')
    findOne(@Args('id') id: number) {
        return this.transactionService.findOne(id);
    }

    @Mutation('updateTransaction')
    update(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
        return this.transactionService.update(updateTransactionInput.id, updateTransactionInput);
    }

    @Mutation('removeTransaction')
    remove(@Args('id') id: number) {
        return this.transactionService.remove(id);
    }
}
