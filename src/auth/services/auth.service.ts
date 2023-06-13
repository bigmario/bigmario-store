import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && compareSync(password, user.password)) {
      const { password, ...rta } = user.toJSON();
      return rta;
    }
    return null;
  }

  public async login(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
