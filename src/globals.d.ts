declare module '*.json' {
    const content: any;
    export default content;
}

declare namespace NodeJS {
    export interface Global {
        window: any;
        document: any;
    }
}
