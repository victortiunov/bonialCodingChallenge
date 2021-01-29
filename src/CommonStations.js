import React from 'react';
import {Layer, Circle} from 'react-konva';

export const CommonStations = props => {
    const {commonStations} = props;

    return (
        <Layer>
            {Object.keys(commonStations).map(key => {
                const {x, y} = commonStations[key];
                return (
                    <Circle key={`common-station-${key}`}
                        x={x}
                        y={y}
                        radius={15}
                        fill='#ffffff'
                        stroke='#000000'
                        strokeWidth={5}
                    />
                )
            })}
        </Layer>
    );
};
