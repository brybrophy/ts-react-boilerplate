export function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}

export function normalizeUrl(url: string): string {
    if (!url) {
        return '';
    }

    return stripTrailingSlash(url.toLowerCase());
}

export function stripTrailingSlash(str: string): string {
    return str.endsWith('/') ? str.slice(0, -1) : str;
}

