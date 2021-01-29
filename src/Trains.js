import React from 'react';
import {Circle, Layer} from 'react-konva';
import {RailwayContext} from "./RailwayMap";

export const Trains = () => {
    return (
        <Layer>
            <RailwayContext.Consumer>
                {trains => trains.map(train => (
                    <Circle key={`train-${train.lineId}`}
                        x={train.x}
                        y={train.y}
                        radius={10}
                        fill='#ffd800'
                    />
                ))}
            </RailwayContext.Consumer>
        </Layer>
    );
};
