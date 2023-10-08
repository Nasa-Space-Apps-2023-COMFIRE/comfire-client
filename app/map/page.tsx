"use client";
import LocationAggregatorMap from "@/components/map";
import {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation';

export default function Map() {
    const searchParams = useSearchParams();
    const cityName = searchParams.get('cityName');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                "http://172.105.98.178:8000/virs"
            );
            const data = await response.json();
            const coords = data.map((info: any) => [
                info.longitude,
                info.latitude,
            ]);
            setCoordinates(coords);
        };
        getData();
    }, []);

    return (
        <div className="relative min-h-[90vh] mt-16">
            <LocationAggregatorMap data={coordinates} cityName={cityName} lat={lat} lng={lng}/>
        </div>
    )
}
