import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const user = new UserEntity();
    user.name = name;
    user.created_at = new Date();
    user.email = email;

    // encrypt password
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const encryptedPassword = String(hash.digest());
    user.password = encryptedPassword;
    await this.userRepository.save(user);

    return user;
  }

  async signin(email: string, password: string) {
    // encrypt password
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const encryptedPassword = String(hash.digest());

    // check if the user exists
    const user = await this.userRepository.findOneBy({
      email,
      password: encryptedPassword,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    // create JWT Token
    const token = this.jwtService.sign({ id: user.id, name: user.name });
    return {
      token,
    };
  }
}
