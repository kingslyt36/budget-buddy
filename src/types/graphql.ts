
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

export class ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export class AuthPayload {
    tokens: TokensPayload;
    user: UserPayload;
}

export class UserPayload {
    id: string;
    username: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class TokensPayload {
    accessToken: string;
    refreshToken: string;
}

export class RegisterResponse {
    status: number;
    data: AuthPayload;
}

export class LoginResponse {
    status: number;
    data: AuthPayload;
}

export class LogoutResponse {
    status: number;
    message: string;
}

export abstract class IMutation {
    abstract register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract logout(): LogoutResponse | Promise<LogoutResponse>;

    abstract refreshToken(): TokensPayload | Promise<TokensPayload>;

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

    abstract changePassword(changePasswordInput?: Nullable<ChangePasswordInput>): Response | Promise<Response>;
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

    abstract getUserByEmail(email: string): Nullable<User> | Promise<Nullable<User>>;
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
    transactions?: Nullable<Transaction[]>;
    portfolios?: Nullable<Portfolio[]>;
}

export class Response {
    status: number;
    data: User;
}

export type DateTime = any;
type Nullable<T> = T | null;
