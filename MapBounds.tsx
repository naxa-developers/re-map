import { useContext, useEffect, useState } from 'react';

import { MapChildContext } from './context';

interface Props {
    bounds?: [number, number, number, number];
    padding: number | mapboxgl.PaddingOptions;
    duration: number;
}

const MapBounds = (props: Props) => {
    const { map, setBounds } = useContext(MapChildContext);
    const {
        padding,
        duration,
        bounds,
    } = props;

    const [initialDuration] = useState(duration);

    // Handle change in bounds
    useEffect(
        () => {
            if (!map || !bounds) {
                return;
            }
            // NOTE: just to be safe here
            if (bounds.length < 4) {
                return;
            }

            const [fooLon, fooLat, barLon, barLat] = bounds;
            setBounds(bounds, padding, initialDuration);

            map.fitBounds(
                [[fooLon, fooLat], [barLon, barLat]],
                {
                    padding,
                    duration: initialDuration,
                },
            );
        },
        [map, bounds, padding, initialDuration, setBounds],
    );

    return null;
};


MapBounds.defaultProps = {
    padding: 0,
    duration: 200, // ms
};

export default MapBounds;
