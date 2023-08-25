import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { PortfolioItemModule } from './modules/portfolio-item/portfolio-item.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            typePaths: ['./**/*.graphql'],
            context: ({ req }) => ({ req }),
            definitions: {
                path: join(process.cwd(), 'src/types/graphql.ts'),
                outputAs: 'class',
            },
        }),
        DatabaseModule,
        PortfolioModule,
        TransactionModule,
        PortfolioItemModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
