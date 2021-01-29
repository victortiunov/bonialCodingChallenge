import React, {useState, useEffect} from 'react';
import {Stage} from 'react-konva';
import {RailwayLine} from './RailwayLine';
import {CommonStations} from './CommonStations';
import {Trains} from './Trains';
import {lines, commonStations, getStationKey} from './data';

const RailwayContext = React.createContext([]);

export const RailwayMap = () => {
    const [trains, setTrains] = useState(lines.map(line => ({
        ...line.stations[0],
        lineId: line.id,
        passengers: line.passengers,
        direction: {
            from: -1,
            to: 0,
            stop: false,
        },
    })));
    const duration = 1000;
    const timeout = 15;
    const ticks = duration / timeout;
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            const nextTick = tick + 1 >= ticks ? 0 : tick + 1;
            setTick(nextTick);
        }, timeout);
        return () => clearInterval(timerId);
    });

    useEffect(() => {
        const newTrains = trains.map(calcNextPoint);
        resolveCollisions(tick, newTrains);
        setTrains(newTrains);
    }, [tick]);

    const calcNextPoint = train => {
        const newTrain = {...train};
        const {direction, lineId} = newTrain;
        const {stations} = lines.find(line => line.id === lineId);
        if (tick === 0) {
            if (!direction.stop) {
                let step = direction.to - direction.from;
                if (direction.to === stations.length - 1) {
                    step = -1;
                } else if (direction.to === 0) {
                    step = 1;
                }
                newTrain.x = stations[direction.to].x;
                newTrain.y = stations[direction.to].y;
                direction.from = direction.to;
                direction.to = direction.to + step;
            }
            direction.stop = false;
        } else if (!direction.stop) {
            const from = stations[direction.from];
            const to = stations[direction.to];

            if (tick === 1) {
                const nextStopKey = getStationKey(to);
                const commonStation = commonStations[nextStopKey] || {};
                const {goesHere, staysHere} = commonStation;
                if (staysHere || (goesHere && goesHere.lineId !== newTrain.lineId)) {
                    direction.stop = true;
                    return newTrain;
                }
            }

            newTrain.x = from.x + (to.x - from.x) / ticks * tick;
            newTrain.y = from.y + (to.y - from.y) / ticks * tick;
        }

        return newTrain;
    };

    const resolveCollisions = (tick, trains) => {
        if (tick !== 0) {
            return;
        }
        Object.keys(commonStations).forEach(key => {
            commonStations[key].goesHere = null;
            commonStations[key].staysHere = null;
        });
        trains.forEach(train => {
            const {direction, lineId} = train;
            const station = lines.find(line => line.id === lineId).stations[direction.to];
            const goesToKey = getStationKey(station);
            if (commonStations[goesToKey] !== undefined) {
                setArrivingTrain(commonStations[goesToKey], train);
            }
        });
    };

    const setArrivingTrain = (station, train) => {
        if (station.goesHere === null) {
            station.goesHere = train;
        } else {
            const [nonPriority, priority] = [train, station.goesHere].sort((a, b) => {
                const diff = a.passengers - b.passengers;
                return diff !== 0 ? diff : a.lineId - b.lineId;
            });
            station.goesHere = priority;
            const nonPriorityFrom = lines.find(line => line.id === nonPriority.lineId).stations[nonPriority.direction.from];
            const fromKey = getStationKey(nonPriorityFrom);
            if (commonStations[fromKey] !== undefined) {
                commonStations[fromKey].staysHere = nonPriority;
            }
        }
        console.log(commonStations);
    };

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
