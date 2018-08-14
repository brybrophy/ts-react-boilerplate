declare module '*.json' {
    const content: any;
    export default content;
}

declare module 'cloudinary-react';
declare module 'countup.js';
declare module 'react-cursor-position';
declare module 'react-imported-component';
declare module 'react-plx';
declare module 'react-scroll';
declare module 'react-visibility-sensor';

declare namespace NodeJS {
    export interface Global {
        window: any;
        document: any;
    }
}