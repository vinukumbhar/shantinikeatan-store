import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';

@Controller('attribute-values')
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Post()
  create(@Body() dto: CreateAttributeValueDto) {
    return this.attributeValueService.create(dto);
  }

  @Get()
  findAll() {
    return this.attributeValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeValueService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAttributeValueDto,
  ) {
    return this.attributeValueService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeValueService.remove(id);
  }
}