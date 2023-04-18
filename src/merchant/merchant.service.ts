import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantRepository } from './merchant.dao';

@Injectable()
export class MerchantService {
  constructor(private readonly merchantRepository: MerchantRepository) {}
  async create(createMerchantDto: CreateMerchantDto) {
    return this.merchantRepository.create(createMerchantDto);
  }

  async findAll() {
    return this.merchantRepository.findAll();
  }

  async findOneById(id: number) {
    return this.merchantRepository.findById(id);
  }

  async findOneByName(name: string) {
    return this.merchantRepository.findByName(name);
  }

  async update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return this.merchantRepository.update(id, updateMerchantDto);
  }

  async remove(id: number) {
    return this.merchantRepository.delete(id);
  }
}
