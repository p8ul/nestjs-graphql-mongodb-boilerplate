import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    console.warn(createCatDto);
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.warn(request);
    return ' This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.warn(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
