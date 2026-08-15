import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { AttributeService } from './attribute.service';

import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeWithValuesDto } from './dto/create-attribute-with-values.dto';
import { UpdateAttributeWithValuesDto } from './dto/update-attribute-with-values.dto';

@Controller('attributes')
export class AttributeController {
  constructor(
    private readonly attributeService: AttributeService,
  ) {}

  // =========================================================
  // CREATE ATTRIBUTE WITH VALUES
  // POST /attributes/with-values
  // =========================================================

  @Post('with-values')
  createWithValues(
    @Body() dto: CreateAttributeWithValuesDto,
  ) {
    return this.attributeService.createWithValues(dto);
  }

  // =========================================================
  // UPDATE ATTRIBUTE WITH VALUES
  // PUT /attributes/:id/with-values
  // =========================================================

  @Put(':id/with-values')
  updateWithValues(
    @Param('id') id: string,
    @Body() dto: UpdateAttributeWithValuesDto,
  ) {
    return this.attributeService.updateWithValues(id, dto);
  }

  // =========================================================
  // CREATE ATTRIBUTE
  // POST /attributes
  // =========================================================

  @Post()
  create(
    @Body() createAttributeDto: CreateAttributeDto,
  ) {
    return this.attributeService.create(createAttributeDto);
  }

  // =========================================================
  // GET ALL ATTRIBUTES
  // GET /attributes
  // =========================================================

  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  // =========================================================
  // GET ONE ATTRIBUTE
  // GET /attributes/:id
  // =========================================================

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.attributeService.findOne(id);
  }

  // =========================================================
  // UPDATE ATTRIBUTE ONLY
  // PATCH /attributes/:id
  // =========================================================

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.update(
      id,
      updateAttributeDto,
    );
  }

  // =========================================================
  // DELETE ATTRIBUTE
  // DELETE /attributes/:id
  // =========================================================

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.attributeService.remove(id);
  }
}