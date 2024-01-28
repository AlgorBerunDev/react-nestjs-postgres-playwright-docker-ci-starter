import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClientExceptionFilter, PrismaModule } from './lib/prisma';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from './modules/auth/auth.module';
import * as path from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({ isGlobal: true }),
    I18nModule.forRootAsync({
      resolvers: [AcceptLanguageResolver],
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '..', 'i18n'),
          watch: true,
        },
        logging: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
