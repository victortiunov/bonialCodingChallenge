import React from 'react';
import {Stage} from 'react-konva';
import {RailwayLine} from './RailwayLine';
import {CommonStops} from "./CommonStops";
import {Train} from "./Train";

export const RailwayMap = () => {
    const lines = [
        {
            title: 'Line A',
            color: '#60a917',
            stops: [
                {x: 150, y: 300},
                {x: 250, y: 300},
                {x: 350, y: 300},
                {x: 500, y: 250},
                {x: 650, y: 250},
                {x: 800, y: 250},
                {x: 950, y: 250},
            ],
        },
        {
            title: 'Line B',
            color: '#0050ef',
            stops: [
                {x: 350, y: 75},
                {x: 350, y: 175},
                {x: 350, y: 300},
                {x: 450, y: 450},
                {x: 650, y: 450},
                {x: 850, y: 450},
            ],
        },
        {
            title: 'Line C',
            color: '#e51400',
            stops: [
                {x: 650, y: 50},
                {x: 650, y: 150},
                {x: 650, y: 250},
                {x: 450, y: 450},
                {x: 350, y: 500},
                {x: 350, y: 600},
            ],
        },
    ];

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            {lines.map(line => (
                <RailwayLine {...line}/>
            ))}
            <CommonStops lines={lines} />
            {lines.map(line => (
                <Train stops={line.stops}/>
            ))}
        </Stage>
    );
};
