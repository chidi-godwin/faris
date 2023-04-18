import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateMerchantDto) {
    return this.prismaService.merchant.create({
      data,
    });
  }

  async update(id: number, data: UpdateMerchantDto) {
    return this.prismaService.merchant.update({
      where: {
        id,
      },
      data,
    });
  }

  async findByName(name: string) {
    return this.prismaService.merchant.findUnique({
      where: {
        name,
      },
    });
  }

  async findById(id: number) {
    return this.prismaService.merchant.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prismaService.merchant.findMany({});
  }

  async findByNameOrCreate(name: string, data: CreateMerchantDto) {
    return this.prismaService.merchant.upsert({
      where: {
        name,
      },
      create: data,
      update: {},
    });
  }

  async delete(id: number) {
    return this.prismaService.merchant.delete({
      where: {
        id,
      },
    });
  }
}
