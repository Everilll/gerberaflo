import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MessageResponse } from '../common/interceptors/transform.interceptor'; // Sesuaikan path import ini

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login admin', description: 'Dapatkan JWT access token untuk admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login berhasil, token dikembalikan',
    schema: {
      example: {
        statusCode: 200,
        message: 'Login berhasil',
        data: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        timestamp: '2026-07-14T10:20:30.000Z',
      },
    },
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Email atau password salah' })
  async login(@Body() dto: LoginDto) {
    const admin = await this.authService.validateAdmin(dto.email, dto.password);
    const result = await this.authService.login(admin);

    return new MessageResponse(result, 'Login berhasil');
  }
}
