import { Module } from '@nestjs/common';
import { CatController } from './cats.controller';

@Module({
  controllers: [CatController],
})
export class CatsModule {}
