//
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
// max-age=<seconds>
// Specifies the maximum amount of time a resource will be considered fresh.
// Contrary to Expires, this directive is relative to the time of the request.
//

export function getCacheControl(ageInSeconds) {
    return {
        header: `public, max-age=${ageInSeconds}`,
        ageInSeconds: ageInSeconds
    };
}

export const timeInSeconds = {
    none: 0,
    hour: 3600,
    day: 86400,
    threeDay: 259200,
    month: 2592000
};

export function getCacheConfig() {
    return {
        index: getCacheControl(timeInSeconds.none),
        default: getCacheControl(timeInSeconds.hour),
        static: getCacheControl(timeInSeconds.hour),
        images: getCacheControl(timeInSeconds.threeDay),
        vcards: getCacheControl(timeInSeconds.threeDay),
        fonts: getCacheControl(timeInSeconds.month)
    };
}
