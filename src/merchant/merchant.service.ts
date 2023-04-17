import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantRepository } from './merchant.dao';

@Injectable()
export class MerchantService {
  constructor(private readonly merchantRepository: MerchantRepository) {}
  create(createMerchantDto: CreateMerchantDto) {
    return this.merchantRepository.create(createMerchantDto);
  }

  findAll() {
    return this.merchantRepository.findAll();
  }

  findOneById(id: number) {
    return this.merchantRepository.findById(id);
  }

  findOneByName(name: string) {
    return this.merchantRepository.findByName(name);
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return this.merchantRepository.update(id, updateMerchantDto);
  }

  remove(id: number) {
    return this.merchantRepository.delete(id);
  }
}
