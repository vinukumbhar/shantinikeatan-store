import { Controller, Get } from '@nestjs/common';
import { MasterService } from './master.service';

@Controller('masters')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get()
  async getMasterData() {
    return this.masterService.getMasterData();
  }

  @Get('attribute')
  async getAttributeMaster() {
    return this.masterService.getAttributeMaster();
  }
}