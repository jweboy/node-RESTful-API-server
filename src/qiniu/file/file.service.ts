import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { File } from './interface/file.interface';
import Qiniu from '../../common/util/qiniu';
import { pagination } from '../../common/util/pagination';

@Injectable()
export class FileService {
  private readonly qiniu: Qiniu;
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    this.qiniu = new Qiniu();
  }
  async postOne(bucket: string, @UploadedFile() file): Promise<File> {
    const fileJson = (respJson: File) => {
      const { name, ...restProps } = respJson;
      return {
        name: decodeURI(name),
        ...restProps,
      };
    };

    return this.qiniu.uploadFile(bucket, file).then(async (data: File) => {
      const existData = await this.fileRepository
        .createQueryBuilder('file')
        .where('file.hash = :hash', { hash: data.hash })
        .andWhere('file.bucket = :bucket', { bucket })
        .getOne();

      // 数据已入库直接返回
      if (!!existData) {
        return fileJson(existData);
      }

      // 插入新数据
      await this.fileRepository
        .createQueryBuilder('file')
        .insert()
        .values([data])
        .execute();

      // 查找出刚刚存入的数据
      const result = await this.fileRepository
        .createQueryBuilder('file')
        .where('file.hash = :hash', { hash: data.hash })
        .andWhere('file.bucket = :bucket', { bucket })
        .getOne();

      return fileJson(result);
    });
  }
  async getAll(query) {
    const { offset, limit } = pagination(query.page, query.size);
    const [data, total] = await this.fileRepository
      .createQueryBuilder('file')
      .where('file.bucket = :bucket', { bucket: query.bucket })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      list: data,
      totalCount: total,
    };
  }
  async deleteOne(name: string, bucket: string): Promise<string> {
    return this.qiniu.deleteFile(name, bucket).then(async () => {
      await this.fileRepository
        .createQueryBuilder('file')
        .delete()
        .where('name = :name', { name })
        .execute();

      return '';
    });
  }
}
