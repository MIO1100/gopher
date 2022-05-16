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
    //res.cookie('jwt', this.authService.login(req.user), {httpOnly:true});
    res.redirect('/main');
    //res.redirect('main');
    //this.authService.login(req.user);
  }
  
  @UseGuards(AuthenticatedGuard)
  @Get('/main')
  @Render('home')
  getProfile(@Request() req) {
    return;
  }
  
  @Get()
  @Render('index')
    async main(@Request() req) {
        return { message: req.flash('loginError') };
  }
  
  @UseGuards(AuthenticatedGuard)
  @Get('/grafana')
  @Redirect('http://127.0.0.1', 3000)
  async grafana(@Request() req) {
    
    return "qweqwe";
  }
  
  
  @UseGuards(AuthenticatedGuard)
  @Get('/change')
  @Render('change')
  getProfile(@Request() req) {
    return;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post('/change')
  @Render('change')
  getProfile(@Request() req) {
    return;
  }
  
  
  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
