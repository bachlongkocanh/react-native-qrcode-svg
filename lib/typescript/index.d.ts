import React from 'react';
import type { RectProps, PathProps, CircleProps } from 'react-native-svg';
import type { StyleProp, ViewStyle } from 'react-native';
import type { QRCodeErrorCorrectionLevel } from 'qrcode';
export type QrCodeSvgProps = {
    value: string;
    frameSize: number;
    contentCells?: number;
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    backgroundColor?: string;
    dotColor?: string;
    style?: StyleProp<ViewStyle>;
    contentBackgroundRectProps?: RectProps;
    content?: React.ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
    figureCircleProps?: CircleProps;
    figurePathProps?: PathProps;
};
export declare function QrCodeSvg({ value, frameSize, contentCells, errorCorrectionLevel, backgroundColor, dotColor, style, contentBackgroundRectProps, content, contentStyle, figureCircleProps, figurePathProps, }: QrCodeSvgProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map