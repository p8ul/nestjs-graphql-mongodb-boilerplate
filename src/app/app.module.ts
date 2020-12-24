import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from '../user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { UserEntity } from 'src/database/entity/user.entity';

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
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
