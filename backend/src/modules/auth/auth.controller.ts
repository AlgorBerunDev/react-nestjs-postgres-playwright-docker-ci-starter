import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './auth.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signUp(signUpDto);
    response.cookie('Authentication', result.cookie, result.cookieOptions);
    return result.body;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { cookie, cookieOptions, body } =
      await this.authService.signIn(signInDto);
    response.cookie('Authentication', cookie, cookieOptions);
    return body;
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return { message: 'Вы успешно вышли из системы.' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { cookie, cookieOptions, body } = await this.authService.refreshToken(
      req.user,
    );
    response.cookie('Authentication', cookie, cookieOptions);
    return body;
  }
}
