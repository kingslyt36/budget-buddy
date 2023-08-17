
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RegisterInput {
    username: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreatePortfolioItemInput {
    symbol: string;
    quantity: number;
    averagePrice: number;
    portfolioId: string;
}

export class UpdatePortfolioItemInput {
    id: string;
    symbol?: Nullable<string>;
    quantity?: Nullable<number>;
    averagePrice?: Nullable<number>;
    portfolioId?: Nullable<string>;
}

export class CreatePortfolioInput {
    name: string;
    description?: Nullable<string>;
    userId: string;
}

export class UpdatePortfolioInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    userId: string;
}

export class CreateTransactionInput {
    type: string;
    symbol: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
    transactionDate: DateTime;
    userId: string;
}

export class UpdateTransactionInput {
    id: string;
    type?: Nullable<string>;
    symbol?: Nullable<string>;
    quantity?: Nullable<number>;
    pricePerUnit?: Nullable<number>;
    totalAmount?: Nullable<number>;
    transactionDate?: Nullable<DateTime>;
    userId?: Nullable<string>;
}

export class CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract register(registerInput: RegisterInput): AuthPayload | Promise<AuthPayload>;

    abstract createPortfolioItem(createPortfolioItemInput: CreatePortfolioItemInput): PortfolioItem | Promise<PortfolioItem>;

    abstract updatePortfolioItem(updatePortfolioItemInput: UpdatePortfolioItemInput): PortfolioItem | Promise<PortfolioItem>;

    abstract removePortfolioItem(id: string): Nullable<PortfolioItem> | Promise<Nullable<PortfolioItem>>;

    abstract createPortfolio(createPortfolioInput: CreatePortfolioInput): Portfolio | Promise<Portfolio>;

    abstract updatePortfolio(updatePortfolioInput: UpdatePortfolioInput): Portfolio | Promise<Portfolio>;

    abstract removePortfolio(id: number): Nullable<Portfolio> | Promise<Nullable<Portfolio>>;

    abstract createTransaction(createTransactionInput: CreateTransactionInput): Transaction | Promise<Transaction>;

    abstract updateTransaction(updateTransactionInput: UpdateTransactionInput): Transaction | Promise<Transaction>;

    abstract removeTransaction(id: string): Nullable<Transaction> | Promise<Nullable<Transaction>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class PortfolioItem {
    id: string;
    symbol: string;
    quantity: number;
    averagePrice: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    portfolio: Portfolio;
}

export abstract class IQuery {
    abstract getPortfolioItems(): PortfolioItem[] | Promise<PortfolioItem[]>;

    abstract getPortfolioItem(id: string): Nullable<PortfolioItem> | Promise<Nullable<PortfolioItem>>;

    abstract getPortfolios(): Nullable<Portfolio>[] | Promise<Nullable<Portfolio>[]>;

    abstract getPortfolio(id: number): Nullable<Portfolio> | Promise<Nullable<Portfolio>>;

    abstract getTransactions(): Transaction[] | Promise<Transaction[]>;

    abstract getTransaction(id: string): Nullable<Transaction> | Promise<Nullable<Transaction>>;

    abstract getUsers(): User[] | Promise<User[]>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Portfolio {
    id: string;
    name: string;
    description?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: User;
    items: PortfolioItem[];
}

export class Transaction {
    id: string;
    type: string;
    symbol: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
    transactionDate: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: User;
}

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    transactions: Transaction[];
    portfolios: Portfolio[];
}

export type DateTime = any;
type Nullable<T> = T | null;
