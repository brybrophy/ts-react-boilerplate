'use strict';

const staticRedirects: IRedirect[] = [];

export interface IRedirect {
    from: string;
    to: string;
}

export default staticRedirects;
