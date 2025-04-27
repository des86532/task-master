import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login({
    provider,
    access_token,
  }: {
    provider: 'google';
    access_token: string;
  }) {
    let userInfo;

    if (provider === 'google') {
      userInfo = await this.getGoogleUser(access_token);
    }

    const { id: provider_id, email, name, avatar } = userInfo;

    let user = await this.userRepository.findOne({
      where: { provider, provider_id },
    });

    if (!user) {
      user = this.userRepository.create({
        provider,
        provider_id,
        email,
        name,
        avatar: avatar,
      });
      await this.userRepository.save(user);
    }

    const token = this.jwtService.sign({
      sub: user.id,
      provider: user.provider,
    });

    return {
      access_token: token,
      user: {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  private async getGoogleUser(access_token: string) {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return {
      id: data.sub,
      email: data.email,
      name: data.name,
      avatar: data.picture,
    };
  }
}
