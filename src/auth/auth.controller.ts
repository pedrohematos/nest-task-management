import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authSignUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInCredentialsDto);
  }
}
