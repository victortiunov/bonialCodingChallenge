import React, {useState, useEffect} from 'react';
import {Stage} from 'react-konva';
import {RailwayLine} from './RailwayLine';
import {CommonStations} from './CommonStations';
import {Trains} from './Trains';
import {lines, commonStations} from './data';

const RailwayContext = React.createContext([]);

export const RailwayMap = () => {
    const [trains, setTrains] = useState(lines.map(line => ({
        ...line.stations[0],
        lineId: line.id,
        direction: {
            from: 0,
            to: 1,
            tick: 0,
        },
    })));

    const duration = 1000;
    const timeout = 10;

    const calcNextPoint = train => {
        const newTrain = {...train};
        const {direction, lineId} = newTrain;
        const {stations} = lines.find(line => line.id === lineId);
        const ticks = duration / timeout;
        const nextTick = direction.tick + 1;
        if (nextTick >= ticks) {
            let step = direction.to - direction.from;
            if (direction.to === stations.length - 1) {
                step = -1;
            } else if (direction.to === 0) {
                step = 1;
            }
            newTrain.x = stations[direction.to].x;
            newTrain.y = stations[direction.to].y;
            newTrain.direction = {
                from: direction.to,
                to: direction.to + step,
                tick: 0,
            };
        } else {
            const from = stations[direction.from];
            const to = stations[direction.to];

            // if (nextTick === 1) {
            //     const nextStopKey = `${to.x}${delimiter}${to.y}`;
            //     return;
            // }

            newTrain.direction = {
                ...direction,
                tick: nextTick,
            };
            newTrain.x = from.x + (to.x - from.x) / ticks * nextTick;
            newTrain.y = from.y + (to.y - from.y) / ticks * nextTick;
        }

        return newTrain;
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            const newTrains = trains.map(calcNextPoint);
            setTrains(newTrains);
        }, timeout);
        return () => clearInterval(timerId);
    });

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            {lines.map(line => (
                <RailwayLine key={`railway-line-${line.id}`} {...line}/>
            ))}
            <CommonStations commonStations={commonStations}/>
            <RailwayContext.Provider value={trains}>
                <Trains />
            </RailwayContext.Provider>
        </Stage>
    );
};

export {RailwayContext};
