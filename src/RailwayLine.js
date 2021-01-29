import React from 'react';
import {Layer, Line, Circle, Text} from 'react-konva';

export const RailwayLine = props => {
    const {title, stations, color} = props;
    const points = [];
    stations.forEach(stop => {
        points.push(stop.x);
        points.push(stop.y);
    });

    return (
        <Layer>
            <Text
                x={stations[0].x - 30}
                y={stations[0].y - 40}
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
            {stations.map((station, idx) => (
                <Circle key={`station-${idx}`}
                    x={station.x}
                    y={station.y}
                    radius={15}
                    fill={color}
                />
            ))}
        </Layer>
    )
};
