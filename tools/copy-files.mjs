import fs from 'fs-extra';

async function copyFiles() {
    try{
        await fs.copy('./src/common/env', './dist/common/env');
        console.log('copy finished');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

copyFiles();