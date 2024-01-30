import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import Role from '@/src/lib/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto): Promise<User> {
    const data = user as User;
    return this.prisma.user.create({ data: { ...data } });
  }

  users() {
    return this.prisma.user.findMany();
  }

  user(userId: number) {
    return this.prisma.user.findFirstOrThrow({
      where: { id: userId },
    });
  }

  findByIdentity(identity: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { contact: identity } });
  }

  async findById(id: number): Promise<
    {
      roles: {
        id: number;
        name: string;
      }[];
    } & User
  > {
    return this.prisma.user.findFirst({
      where: { id },
      include: { roles: true },
    });
  }

  async isAdmin() {
    // const user = await this.prisma.user.findFirst({ where: { username } });
    return true;
  }

  async addRoleToUser(userId: number, role: Role): Promise<User> {
    const userWithRoles = await this.findById(userId);

    if (!userWithRoles) {
      throw new Error('Пользователь не найден');
    }

    const roleExists = userWithRoles.roles.some(
      (userRole) => userRole.name === role,
    );

    if (!roleExists) {
      const roleToAdd = await this.prisma.role.findUnique({
        where: { name: role },
      });

      if (!roleToAdd) {
        await this.prisma.role.create({
          data: {
            name: role,
            users: {
              connect: { id: userId },
            },
          },
        });
      } else {
        return await this.prisma.user.update({
          where: { id: userId },
          data: {
            roles: {
              connect: { id: roleToAdd.id },
            },
          },
        });
      }
    }

    return this.findById(userId);
  }
}
