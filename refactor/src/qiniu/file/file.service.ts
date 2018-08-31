import { Injectable  } from '@nestjs/common';
import Qiniu from '../../common/util/qiniu';

@Injectable()
export class FileService {
    private readonly qiniu: Qiniu;
    constructor() {
       this.qiniu = new Qiniu();
    }
    upload(file) {
        this.qiniu.uploadFile('our-future', file, (respErr, respBody, respInfo) => {
            console.log(respErr, respBody, respInfo.statusCode);
            if (respErr) {
                throw respErr;
              }
        });
    }
}