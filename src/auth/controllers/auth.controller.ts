import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request, @Body() payload: LoginDto) {
    const user = req.user as User;
    return this.authService.login(user);
  }
}
