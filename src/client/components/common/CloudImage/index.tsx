import React from 'react';
import cloudData from '../../../data/cloudinary.json';
import { Image, Transformation } from 'cloudinary-react';

interface IProps {
    alt: string;
    className?: string;
    publicId: string;
    autoFormat?: boolean;
    style?: any;
}

const CloudImage = (props: IProps) => {
    return (
        <Image
            alt={props.alt}
            className={props.className}
            cloudName={cloudData.cloudName}
            publicId={props.publicId}
            secure
            style={props.style || {}}
        >
            <Transformation
                dpr="auto"
                crop="scale"
                width="auto"
                fetchFormat={props.autoFormat ? 'auto' : ''}
            />
        </Image>
    );
};

export default CloudImage;
