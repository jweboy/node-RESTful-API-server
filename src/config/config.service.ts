import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    readonly envConfig: { [prop: string]: string};

    constructor(filePath: string) {
        this.envConfig = this.parse(filePath);
        console.log(filePath, this.envConfig);
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    parse(filePath: string): any {
        return dotenv.parse(fs.readFileSync(filePath));
    }
}