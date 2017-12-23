import { getAssetsConfig } from './assetsConfig';
import { getCacheConfig } from './cacheConfig';
import { getProcessEnvConfig } from './processEnvConfig';

export default function createConfig() {
    const ENV = getProcessEnvConfig();
    const CACHE = getCacheConfig();
    const shouldBundleAssets = ENV.NODE_ENV != 'development';
    const ASSETS = getAssetsConfig(shouldBundleAssets);

    return {
        Q: {
            shouldBundleAssets: () => shouldBundleAssets
        },
        ENV,
        CACHE,
        ASSETS
    };
}
