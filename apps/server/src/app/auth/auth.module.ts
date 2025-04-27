import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'neilyang',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
