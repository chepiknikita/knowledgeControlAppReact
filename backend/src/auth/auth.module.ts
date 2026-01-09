import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth-guard';

@Module({
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: async (service: ConfigService) => {
        const secret = service.get<string>('JWT_ACCESS_SECRET');
        console.log('JWT Secret loaded:', secret ? 'Yes' : 'No');
        
        if (!secret) {
          throw new Error('JWT_ACCESS_SECRET is not defined in environment variables');
        }
        
        return {
          secret: secret,
          signOptions: {
            expiresIn: service.get<string>('JWT_ACCESS_EXPIRES') || '15m',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
