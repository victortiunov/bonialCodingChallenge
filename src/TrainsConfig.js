import React, {useEffect, useRef, useState} from 'react';
import {TrainsConfigContext} from './RailwayMap';

export const TrainsConfig = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const click = e => {
        console.log(e.target);
        console.log(ref);
    };

    useEffect(() => {
        window.addEventListener('click', click);
        return window.removeEventListener('click', click);
    }, []);

    return (
        <TrainsConfigContext.Consumer>
            {config => (
                <React.Fragment>
                    <div className='trains-config__button' onClick={() => setOpen(true)}/>
                    <div className={`trains-config ${open ? 'trains-config_open' : ''}`}>
                        <div className='trains-config__form' ref={ref}>
                            <div className='form__header'>Passengers in trains</div>
                            <div className='form__body'>
                                {config.trains.map(train => (
                                    <div key={train.lineId} className='trains-config__train'>
                                        <label>{train.lineName}</label>
                                        <input
                                            type='number'
                                            value={train.passengers}
                                            onChange={e => config.setPassengers(train.lineId, e.target.value)}/>
                                    </div>
                                ))}
                            </div>
                            <div className='form__footer'>
                                <button onClick={() => setOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </TrainsConfigContext.Consumer>
    );
};
