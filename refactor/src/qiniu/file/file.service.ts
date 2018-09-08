import { Injectable, UploadedFile  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Qiniu from '../../common/util/qiniu';
import { FileEntity } from './file.entity';
import { File } from './interface/file.interface';

@Injectable()
export class FileService {
    private readonly qiniu: Qiniu;
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {
        this.qiniu = new Qiniu();
    }
    async upload(bucket: string, @UploadedFile() file): Promise<File> {
        const fileJson = (respJson: File) => {
            const { name, ...restProps } = respJson;
            return {
                name: decodeURI(name),
                ...restProps,
            };
        };
        return this.qiniu
            .uploadFile(bucket, file)
            .then(async (data: File) => {
                const existData = await this.fileRepository.findOne({ name: data.name });
                // 数据已入库直接返回
                if (!!existData) {
                    return fileJson(existData);
                }

                // 插入新数据
                const result = await this.fileRepository.save(data);
                return fileJson(result);
            });
    }
    async getAll(query) {
        const test = await this.fileRepository.find();
        // console.log(test);
        return this.qiniu.getFiles(query);
    }
    delete(name: string, bucket: string) {
        return this.qiniu.deleteFile(name, bucket);
    }
}