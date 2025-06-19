import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { config } from './constants';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      database: 'NestJStrainingFullstack',
      username: 'root',
      password: '123456',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      options: {
        encrypt: false,
      }
    }),
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '2h' },
      global: true,
    }),
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
