import FS from 'fs';
import path from 'path';

export function fileExists(filePath: string) {
    try {
        return FS.statSync(filePath).isFile();
    } catch (err) {
        console.log(`fileExists err [${path.resolve(filePath)}]:\n`, err);

        return false;
    }
}

export function readJsonSyncIfExists(filePath: string) {
    if (!fileExists(filePath)) {
        console.log(`File [${path.resolve(filePath)}] does not exist`);

        return;
    }

    return JSON.parse(FS.readFileSync(filePath, 'utf8'));
}

export function readJsonSync(filePath: string) {
    if (!fileExists(filePath)) {
        throw new Error(`File [${path.resolve(filePath)}] does not exist`);
    }

    return JSON.parse(FS.readFileSync(filePath, 'utf8'));
}
