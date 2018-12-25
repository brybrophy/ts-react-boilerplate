declare module '*.json' {
    const content: any;
    export default content;
}

declare module 'chalk';
declare module 'sitemap';

declare namespace NodeJS {
    export interface Global {
        window: any;
        document: any;
    }
}
