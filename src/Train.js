import React, {useEffect, useState} from 'react';
import {Layer, Circle} from 'react-konva';

export const Train = props => {
    const {stops} = props;
    const duration = 1000;
    const timeout = 10;
    const [direction, setDirection] = useState({from: 0, to: 1, tick: 0});
    const [point, setPoint] = useState({x: stops[0].x, y: stops[0].y});

    const calcNextPoint = () => {
        const ticks = duration / timeout;
        const tick = direction.tick + 1;
        if (tick === ticks) {
            let step = direction.to - direction.from;
            if (direction.to === stops.length - 1) {
                step = -1;
            } else if (direction.to === 0) {
                step = 1;
            }
            setPoint(stops[direction.to]);
            setDirection({
                from: direction.to,
                to: direction.to + step,
                tick: 0,
            });
        } else {
            const from = stops[direction.from];
            const to = stops[direction.to];

            setDirection({
                ...direction,
                tick,
            });
            setPoint({
                x: from.x + (to.x - from.x) / ticks * tick,
                y: from.y + (to.y - from.y) / ticks * tick,
            });
        }
    };

    useEffect(() => {
        const timerId = setInterval(calcNextPoint, timeout);
        return () => clearInterval(timerId);
    });

    return (
        <Layer>
            <Circle
                x={point.x}
                y={point.y}
                radius={10}
                fill='#ffd800'
            />
        </Layer>
    );
};
