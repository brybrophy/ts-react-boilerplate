import * as path from 'path';
import { readJsonSyncIfExists, readJsonSync } from '../utils/fsUtils';

const serverDir = path.resolve(path.join(__dirname, '..'));
const repoDir = path.join(serverDir, '..', '..');
const distDir = path.join(repoDir, 'dist');
const buildJsonPath = path.join(distDir, 'build-data.json');

export function getAssetsConfig(useHashedAssets) {
    const buildData = readJsonSync(buildJsonPath);

    console.log(
        '/api/build.json returning: \n',
        JSON.stringify(buildData, undefined, 4)
    );

    return {
        DIRS: {
            repo: repoDir,
            dist: distDir,
            server: serverDir
        },
        buildData,
        WEBPACK: {
            HashedAssets: getWebpackHashedAssetsPaths(useHashedAssets)
        }
    };
}

export function getWebpackHashedAssetsPaths(useHashedAssets) {
    if (!distDir) {
        throw new Error('distDir must be set!');
    }

    if (useHashedAssets) {
        const webpackAssetsPath = path.join(distDir, 'webpack-assets.json');
        const data = readJsonSyncIfExists(webpackAssetsPath);

        return {
            path: webpackAssetsPath,
            data: data
        };
    }

    return {
        path: 'no-file',
        data: { main: { js: '/bundle.js', css: '/assets/styles.css' } }
    };
}
