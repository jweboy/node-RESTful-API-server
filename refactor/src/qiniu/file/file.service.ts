import { Injectable  } from '@nestjs/common';
// import * as qiniu from 'qiniu';
import Qiniu from '../../common/util/qiniu';

// const formUploader = new qiniu.form_up.FormUploader({});
// const putExtra = new qiniu.form_up.PutExtra();
@Injectable()
export class FileService {
    private readonly qiniu: Qiniu;
    constructor() {
       this.qiniu = new Qiniu();
    }
    upload(file) {
        this.qiniu.uploadFile('our-future', file);
    }
}