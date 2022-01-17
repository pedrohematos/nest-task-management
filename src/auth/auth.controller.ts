import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });

  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    this.logger.verbose(
      `User "${authSignUpCredentialsDto.username}" signing up`,
    );
    return this.authService.signUp(authSignUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `User "${authSignInCredentialsDto.username}" signing in`,
    );
    return this.authService.signIn(authSignInCredentialsDto);
  }
}
