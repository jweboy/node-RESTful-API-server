import { Injectable, UploadedFile  } from '@nestjs/common';
import Qiniu from '../../common/util/qiniu';

@Injectable()
export class FileService {
    private readonly qiniu: Qiniu;
    constructor() {
       this.qiniu = new Qiniu();
    }
    // TODO: return的Promise需要一个泛型
    upload(bucket: string, @UploadedFile() file) {
        return this.qiniu.uploadFile(bucket, file);
    }
    getAll(query) {
        return this.qiniu.getFiles(query);
    }
}