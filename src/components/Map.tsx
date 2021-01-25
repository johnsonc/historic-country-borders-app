import React from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import Map from '../util/ReactMapBoxGl'
import MapboxGl from 'mapbox-gl';
import { useData } from '../hooks/useData';

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  year: string;
}

const MapContainer = ({ year }: MapContainerProps) => {
  const [isLoading, data] = useData(year);

  return (
    <div className="map-grid">
      <Map
        className="map"
        style="mapbox://styles/nrgapple/ckk7nff4z0jzj17pitiuejlvt"
        onStyleLoad={(map: MapboxGl.Map) => {
          map.setZoom(2);
          map.resize();
        }}
      >
        {data && (
          <>
            <GeoJSONLayer
              data={data.borders}
              fillPaint={{
                'fill-color': ['get', 'COLOR'],
                'fill-opacity': 0.5,
              }}
            />
            <GeoJSONLayer
              data={data.labels}
              symbolLayout={{
                'text-field': '{NAME}',
                'text-font': ['Lato Bold'],
                'text-size': {
                  base: 1,
                  stops: [
                    [12, 12],
                    [16, 16],
                  ],
                },
                'text-padding': 3,
                'text-letter-spacing': 0.1,
                'text-max-width': 7,
                'text-transform': 'uppercase',
              }}
            />
          </>
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
