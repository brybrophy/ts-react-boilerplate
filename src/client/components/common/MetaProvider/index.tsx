import React from 'react';
import Helmet from 'react-helmet';
import { IMetaStore } from '../../../stores/index.d';

interface IProps {
    meta: IMetaStore;
}

const MetaProvider: React.SFC<IProps> = (props: IProps) => {
    return (
        <Helmet>
            <title>{props.meta.title}</title>
            <meta name="description" content={props.meta.description} />
            <link rel="canonical" href={props.meta.canonicalUrl} />
            <meta property="og:url" content={props.meta.canonicalUrl} />
            <meta property="og:title" content={props.meta.title} />
            <meta property="og:image" content={props.meta.imageUrl} />
            <meta property="og:description" content={props.meta.description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default MetaProvider;
