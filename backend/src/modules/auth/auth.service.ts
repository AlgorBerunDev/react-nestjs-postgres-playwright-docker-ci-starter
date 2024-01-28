import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { SignUpDto, SignInDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { contact, username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prismaService.user.create({
        data: {
          contact,
          username,
          password: hashedPassword,
        },
      });

      const payload = { contact: user.contact, sub: user.id };
      const token = this.jwtService.sign(payload);

      return {
        body: { message: 'Пользователь успешно создан.' },
        cookie: token,
        cookieOptions: {
          httpOnly: true,
          // Установите другие необходимые параметры для cookie здесь
        },
      };
    } catch (error) {
      throw new HttpException(
        'Ошибка при создании пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { contact, password } = signInDto;
    const user = await this.prismaService.user.findUnique({
      where: { contact },
    });

    if (!user) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpException(
        'Неверные учетные данные',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { contact: user.contact, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      body: { message: 'Аутентификация успешна.' },
      cookie: token,
      cookieOptions: {
        httpOnly: true,
        // Установите другие необходимые параметры для cookie здесь
      },
    };
  }

  async refreshToken(user: any): Promise<any> {
    // Предполагаем, что у пользователя есть поле с refresh token и логика его обновления
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: user.sub },
    });

    if (!existingUser) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { contact: existingUser.contact, sub: existingUser.id };
    const newToken = this.jwtService.sign(payload);

    return {
      cookie: newToken,
      cookieOptions: {
        httpOnly: true,
        // Установите другие необходимые параметры для cookie здесь
      },
    };
  }

  async validateUser(contact: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { contact },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
