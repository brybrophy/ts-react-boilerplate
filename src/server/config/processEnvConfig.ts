// function requireEnv(pEnv, envVar: string) {
//     if (!pEnv[envVar]) {
//         console.log();
//         console.log(
//             `***** YOU must set process.env.${envVar} (use .env or azure environment)`
//         );
//         console.log();
//         console.log();
//         console.log(
//             '***** SHUTTING DOWN SERVER UNTIL CONFIGURED CORRECTLY *****'
//         );
//         console.log();
//         console.log();
//
//         throw new Error(
//             `***** YOU must set process.env.${envVar} (use .env or azure environment)`
//         );
//     }
//     return pEnv[envVar];
// }

function checkSetEnv(pEnv, ev, def) {
    if (!pEnv[ev]) {
        pEnv[ev] = def;
        console.log(
            ` *process.env.${ev} is NOT set. SETTING process.env.${ev} to ${
                pEnv[ev]
            }*`
        );
    } else {
        console.log(` *process.env.${ev} was ALREADY set to ${pEnv[ev]}*`);
    }
    return pEnv[ev];
}

function setEnvDefaults(pEnv) {
    checkSetEnv(pEnv, 'API_ENV', 'production');
    checkSetEnv(pEnv, 'SEO_ENV', 'staging');
    checkSetEnv(pEnv, 'NODE_ENV', 'production');
}

export function getProcessEnvConfig() {
    require('dotenv').config({ silent: true });
    setEnvDefaults(process.env);
    console.log();

    return {
        API_ENV: process.env.API_ENV,
        NODE_ENV: process.env.NODE_ENV,
        SEO_ENV: process.env.SEO_ENV,
        PORT: process.env.PORT || 3000
    };
}
