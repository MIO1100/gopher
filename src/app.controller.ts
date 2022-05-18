import { Controller, Request, Post, Get, UseGuards, Render, Redirect, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth/auth.service';

import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthExceptionFilter } from './guards/auth-exceptions.filter';



@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Res() res: Response) {
    res.redirect('/main');
  }
  
  @UseGuards(AuthenticatedGuard)
  @Get('/main')
  @Render('home')
  async startPage(@Request() req) {
    return;
  }
  
  @Get()
  @Render('index')
  async main(@Request() req) {
        return { message: req.flash('loginError') };
  }
  
  @UseGuards(AuthenticatedGuard)
  @Get('/grafana')
  async grafana(@Res() res: Response) {
    res.redirect('http://127.0.0.1:3000');
  }
  
  
  @UseGuards(AuthenticatedGuard)
  @Get('/change')
  @Render('change')
  async openCreds(@Request() req) {
    return;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post('/change')
  @Render('change')
  async changeCreds(@Request() req) {
    return;
  }
  
  
  @Get('/logout')
  async logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
