import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입 API' })
  async signup(
    @Body() body: { email: string; password: string; nickname: string },
  ) {
    return this.authService.signup(body.email, body.password, body.nickname);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
