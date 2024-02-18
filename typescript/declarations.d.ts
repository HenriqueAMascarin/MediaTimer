declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

declare module '@env' {
    export const YOUTUBE_KEY: string;
    export const GOOGLE_KEY: string,
}