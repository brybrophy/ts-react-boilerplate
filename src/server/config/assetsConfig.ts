import path from 'path';
import { readJsonSyncIfExists } from '../utils/fsUtils';

const serverDir = path.resolve(path.join(__dirname, '..'));
const repoDir = path.join(serverDir, '..', '..');
const distDir = path.join(repoDir, 'dist');

export function getAssetsConfig(useHashedAssets: boolean) {
    return {
        DIRS: {
            repo: repoDir,
            dist: distDir,
            server: serverDir
        },
        WEBPACK: {
            HashedAssets: getWebpackHashedAssetsPaths(useHashedAssets)
        }
    };
}

export function getWebpackHashedAssetsPaths(useHashedAssets: boolean) {
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
