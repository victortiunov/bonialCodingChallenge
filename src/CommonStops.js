import React from 'react';
import {Layer, Circle} from 'react-konva';

export const CommonStops = props => {
    const commonStops = [{x: 350, y: 300}];
    const set = new Set();
    props.lines.forEach(line => {
        line.stops.forEach(stop => {
            const key = `${stop.x}-${stop.y}`;
            if (set.has(key)) {
                commonStops.push(stop);
            }
            set.add(key);
        });
    });

    return (
        <Layer>
            {commonStops.map(stop => (
                <Circle
                    x={stop.x}
                    y={stop.y}
                    radius={15}
                    fill='#ffffff'
                    stroke='#000000'
                    strokeWidth={5}
                />
            ))}
        </Layer>
    );
};
