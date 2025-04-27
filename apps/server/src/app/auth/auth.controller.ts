import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { access_token: string; provider: 'google' }
  ): Promise<{
    access_token: string;
    user: { email: string; name: string; avatar: string };
  }> {
    return await this.authService.login(body);
  }
}
