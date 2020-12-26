import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from '../user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { UserEntity } from 'src/entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/middlewares/auth-guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('DB_URL'),
        synchronize: true,
        logging: process.env.NODE_ENV === 'development' ? true : false,
        dropSchema: process.env.NODE_ENV === 'test' ? true : false,
        entities: [UserEntity],
        migrations: [],
        subscribers: [],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      playground: true,
      debug: process.env.NODE_ENV === 'development' ? true : false,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
