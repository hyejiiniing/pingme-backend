import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/kakao')
  async kakaoLogin(@Body() body: { email: string; nickname: string }) {
    let user = await this.userService.findByEmail(body.email);
    if (!user) {
      user = await this.userService.createSocial(
        body.email,
        body.nickname,
        'kakao',
      );
    }
    return { message: '로그인 성공', user };
  }
}
