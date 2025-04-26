// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import {PrismaModule} from "./prisma/prisma.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,                             // обязателен в v10
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
      PrismaModule,
    TaskModule,
  ],
})
export class AppModule {}
