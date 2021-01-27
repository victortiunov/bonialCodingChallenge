import React from 'react';
import {Layer, Line, Circle, Text} from 'react-konva';

export const RailwayLine = props => {
    const {title, stops, color} = props;
    const points = [];
    stops.forEach(stop => {
        points.push(stop.x);
        points.push(stop.y);
    });

    return (
        <Layer>
            <Text
                x={stops[0].x - 30}
                y={stops[0].y - 40}
                text={title}
                fill={color}
                fontSize={20}
                fontStyle='bold'
            />
            <Line
                x={0}
                y={0}
                points={points}
                stroke={color}
                strokeWidth={6}
            />
            {stops.map(stop => (
                <Circle
                    x={stop.x}
                    y={stop.y}
                    radius={15}
                    fill={color}
                />
            ))}
        </Layer>
    )
};
