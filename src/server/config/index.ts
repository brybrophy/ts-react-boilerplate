import { getCacheConfig } from './cacheConfig';
import { getProcessEnvConfig } from './processEnvConfig';

export default function createConfig() {
    const ENV = getProcessEnvConfig();
    const CACHE = getCacheConfig();

    return {
        ENV,
        CACHE
    };
}
