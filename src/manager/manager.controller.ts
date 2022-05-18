import { Controller, Request, Post, Get, UseGuards, Render, Redirect, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from '../guards/login.guard';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { AuthExceptionFilter } from '../guards/auth-exceptions.filter';

import { ManagerService } from './manager.service';

@Controller('manager')
@UseFilters(AuthExceptionFilter)
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/suricata_on_off')
  async suricata_on_off(@Request() req) {
    return this.managerService.suricata_on_off(req.body.checked);
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post('/protocol_on_off')
  async protocol_on_off(@Request() req) {
      
    return this.managerService.protocol_on_off(req.body.id)
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post('/suricata_update')
  async update_suricata(@Request() req) {
    return this.managerService.suricata_update(req.body.checked);
  }
  
}
