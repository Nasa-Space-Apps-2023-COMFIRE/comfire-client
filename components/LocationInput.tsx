// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {LoadScript, StandaloneSearchBox} from '@react-google-maps/api';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';

const libraries = ["places"];

export default function LocationInput() {
    const [address, setAddress] = useState("");
    const [cityName, setCityName] = useState("");
    const [cityBounds, setCityBounds] = useState(null);
    const searchBoxRef = useRef(null);
    const onLoad = ref => searchBoxRef.current = ref;

    const placesServiceRef = useRef(null);

    const onPlacesChanged = () => {
        const place = searchBoxRef.current.getPlaces()[0];

        // Extract city name from address components
        let cityName = '';
        for (let i = 0; i < place.address_components.length; i++) {
            if (place.address_components[i].types.includes("locality")) {
                cityName = place.address_components[i].long_name;
                break;
            }
        }

        if (cityName && placesServiceRef.current) {
            // Instantiate a new PlacesService
            const service = new google.maps.places.PlacesService(placesServiceRef.current);

            // Use the service to search for the city
            service.textSearch({query: cityName}, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
                    const cityViewport = results[0].geometry.viewport;
                    if (cityViewport) {
                        const bounds = {
                            northEast: {
                                lat: cityViewport.getNorthEast().lat(),
                                lng: cityViewport.getNorthEast().lng()
                            },
                            southWest: {
                                lat: cityViewport.getSouthWest().lat(),
                                lng: cityViewport.getSouthWest().lng()
                            }
                        };
                        setCityBounds(bounds);
                    }
                    setCityName(cityName); // Update the state with the city name
                }
            });
        }
    };

    useEffect(() => {
        if (cityBounds) {
            const queryString = `northEastLat=${cityBounds.northEast.lat}$northEastLng=${cityBounds.northEast.lng}$southWestLat=${cityBounds.southWest.lat}$southWestLng=${cityBounds.southWest.lng}`;
            const endpoint = `http://172.105.98.178:8000/modis/${queryString}`;

            // Make a GET request to the modified endpoint
            fetch(endpoint).then(response => {
                // Handle the response as needed
                return response.json();
            }).then(data => {
                console.log(data);
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        }
    }, [cityBounds]);


    return (
        <>
            <div ref={placesServiceRef} style={{display: 'none'}}></div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                <div className="relative w-1/2">
                    <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <input
                            className="w-full h-12 px-12 py-2 border rounded-full bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </StandaloneSearchBox>
                </div>
            </LoadScript>
        </>
    );
}

