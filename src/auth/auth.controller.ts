import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common'; // Add UnauthorizedException
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    // Change this line:
    // if (!user) throw new Error('Invalid credentials');

    // To this:
    if (!user) throw new UnauthorizedException('Invalid credentials'); // <-- Proper HTTP 401
    
    return this.authService.login(user);
  }
}
