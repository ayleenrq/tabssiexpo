import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function TabssiLogo({ color = '#7C3AED', size = 64 }) {
    const w = size;
    const h = size;

    return (
        <Svg width={w} height={h} viewBox="0 0 64 64">
            <Path
                d={`
          M ${w * 0.2} ${h * 0.85}
          Q ${w * 0.1} ${h * 0.85} ${w * 0.15} ${h * 0.7}
          L ${w * 0.45} ${h * 0.15}
          Q ${w * 0.5} ${h * 0.05} ${w * 0.55} ${h * 0.15}
          L ${w * 0.85} ${h * 0.7}
          Q ${w * 0.9} ${h * 0.85} ${w * 0.8} ${h * 0.85}
          L ${w * 0.65} ${h * 0.85}
          L ${w * 0.5} ${h * 0.55}
          L ${w * 0.35} ${h * 0.85}
          Z
        `}
                fill={color}
            />
        </Svg>
    );
}
