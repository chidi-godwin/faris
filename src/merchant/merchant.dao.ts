import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateMerchantDto) {
    this.prismaService.merchant.create({
      data,
    });
  }

  async update(id: number, data: UpdateMerchantDto) {
    this.prismaService.merchant.update({
      where: {
        id,
      },
      data,
    });
  }

  async findByName(name: string) {
    this.prismaService.merchant.findUnique({
      where: {
        name,
      },
    });
  }

  async findById(id: number) {
    this.prismaService.merchant.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    this.prismaService.merchant.findMany({});
  }

  async findByNameOrCreate(name: string, data: CreateMerchantDto) {
    this.prismaService.merchant.upsert({
      where: {
        name,
      },
      create: data,
      update: {},
    });
  }
}
