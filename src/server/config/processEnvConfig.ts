function checkSetEnv(envKey: string, fallback: string) {
    if (!process.env[envKey]) {
        process.env[envKey] = fallback;
        console.log(
            ` *process.env.${envKey} is NOT set. SETTING process.env.${envKey} to ${
                process.env[envKey]
            }*`
        );
    } else {
        console.log(
            ` *process.env.${envKey} was ALREADY set to ${process.env[envKey]}*`
        );
    }
    return process.env[envKey];
}

function setEnvDefaults() {
    checkSetEnv('API_ENV', 'production');
    checkSetEnv('SEO_ENV', 'staging');
    checkSetEnv('NODE_ENV', 'production');
}

export function getProcessEnvConfig() {
    require('dotenv').config({ silent: true });
    setEnvDefaults();

    return {
        API_ENV: process.env.API_ENV,
        NODE_ENV: process.env.NODE_ENV,
        SEO_ENV: process.env.SEO_ENV,
        PORT: process.env.PORT || 3000
    };
}
