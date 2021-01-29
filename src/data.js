const lines = [
    {
        id: 1,
        title: 'Line A',
        color: '#60a917',
        stations: [
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
        id: 2,
        title: 'Line B',
        color: '#0050ef',
        stations: [
            {x: 350, y: 75},
            {x: 350, y: 175},
            {x: 350, y: 300},
            {x: 450, y: 450},
            {x: 650, y: 450},
            {x: 850, y: 450},
        ],
    },
    {
        id: 3,
        title: 'Line C',
        color: '#e51400',
        stations: [
            {x: 650, y: 50},
            {x: 650, y: 150},
            {x: 650, y: 250},
            {x: 450, y: 450},
            {x: 350, y: 500},
            {x: 350, y: 600},
        ],
    },
];

const getStationKey = (x, y) => `${x}-${y}`;

const getCommonStations = () => {
    const commonStations = [{x: 350, y: 300}];
    const allStations = new Set();
    lines.forEach(line => {
        line.stations.forEach(station => {
            const key = getStationKey(station.x, station.y);
            if (allStations.has(key)) {
                commonStations.push(station);
            }
            allStations.add(key);
        });
    });
    return commonStations;
};

const commonStations = getCommonStations();

export {lines, commonStations, getStationKey};
