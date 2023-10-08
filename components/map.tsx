"use client";
// components/Map.jsx

import React, {useCallback, useState} from "react";

import Map from "react-map-gl";
import {HexagonLayer} from "@deck.gl/aggregation-layers";
// import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from 'lodash'; // Import lodash for throttling
// import map config
import {colorRange, lightingEffect, material,} from "@/lib/map-config";

const LocationAggregatorMap = ({
                                   upperPercentile = 100,
                                   coverage = 1,
                                   data,
                                   cityName, lat, lng
                               }) => {
    const [radius, setRadius] = useState(5000);

    const handleViewStateChange = useCallback(_.throttle(({ viewState }) => {
        const { zoom } = viewState;
        requestAnimationFrame(() => {  // Use requestAnimationFrame
            let newRadius;
            if (zoom >= 8 && zoom <= 13.5) {
                // Linear increase in radius between zoom levels 8 and 13.5
                const m = (4000 - 100) / (8 - 13.5);
                const b = 100 - m * 13.5;
                newRadius = m * zoom + b;
            } else if (zoom > 13.5 && zoom <= 15) {
                // Radius remains at 100 between zoom levels 13.5 and 15
                newRadius = 100;
            }
            setRadius(newRadius);
        });
    }, 200), []);  // Throttle updates to every 200ms




    const INITIAL_VIEW_STATE = {
        longitude: Number(lng),
        latitude: Number(lat),
        zoom: 8,
        minZoom: 8,
        maxZoom: 15,
        pitch: 0,
        bearing: 0
    };

    const handleRadiusChange = (e) => {
        console.log(e.target.value);
        setRadius(e.target.value);
    };

    // creating tooltip
    function getTooltip({object}) {
        if (!object) {
            return null;
        }
        const lat = object.position[1];
        const lng = object.position[0];
        const count = object.points.length;

        return `\
        latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
        longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
        ${count} locations here`;
    }

    const layers = [
        new HexagonLayer({
            id: "heatmap",
            colorRange,
            coverage,
            data,
            elevationRange: [0, 100],
            elevationScale: data && data.length ? 50 : 0,
            extruded: true,
            getPosition: (d) => d,
            pickable: true,
            radius,
            upperPercentile,
            material,

            transitions: {
                elevationScale: 3000,
            },
        }),
    ];


    return (
        <div className="">
            <DeckGL
                layers={layers}
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                getTooltip={getTooltip}
                onViewStateChange={handleViewStateChange}
            >
                <Map
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                ></Map>

                {/* FLOATING CONTROLLER */}

                <div
                    className="absolute bg-slate-900 text-white min-h-[200px] h-auto w-[250px] top-10 left-5 rounded-lg p-4 text-sm">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl uppercase mb-1">City: {cityName}</h2>
                        <h2 className="font-bold text-md uppercase mb-4">INPOST LOCS</h2>
                        <input
                            name="radius"
                            className="w-fit py-2"
                            type="range"
                            value={radius}
                            min={500}
                            step={50}
                            max={10000}
                            onChange={handleRadiusChange}
                        />
                        <label htmlFor="radius">
                            Radius -{" "}
                            <span className="bg-indigo-500 font-bold text-white px-2 py-1 rounded-lg">
                {radius}
              </span>{" "}
                            meters
                        </label>
                        <p>
                            {" "}
                            <span className="font-bold">{data.length}</span> Locations
                        </p>
                    </div>
                </div>
            </DeckGL>
        </div>
    );
};

export default LocationAggregatorMap;