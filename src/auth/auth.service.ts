import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService', { timestamp: true });

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    return await this.usersRepository.createUser(authSignUpCredentialsDto);
  }

  async signIn(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authSignInCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      this.logger.verbose(
        `Failed to sign in user "${username}". User has invalid credentials`,
      );
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
