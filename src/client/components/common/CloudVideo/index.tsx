import React from 'react';
import cloudData from '../../../data/cloudinary.json';
import { Transformation, Video } from 'cloudinary-react';

interface IProps {
    autoPlay?: boolean;
    className?: string;
    loop?: boolean;
    muted?: boolean;
    publicId: string;
    style?: any;
}

const CloudVideo = (props: IProps) => {
    return (
        <Video
            className={props.className}
            style={props.style}
            cloudName={cloudData.cloudName}
            publicId={props.publicId}
            secure
            autoPlay={props.autoPlay}
            muted={props.muted}
            loop={props.loop}
            playsInline
        >
            <Transformation quality="85" bitRate="8000k" />
        </Video>
    );
};

export default CloudVideo;
