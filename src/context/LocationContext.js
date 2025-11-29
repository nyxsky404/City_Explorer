import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [currentCity, setCurrentCity] = useState('Pune'); // Default fallback
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    console.log('Location permission denied');
                    setLoading(false);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                // Reverse geocode to get city
                let address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });

                if (address && address.length > 0) {
                    const city = address[0].city || address[0].subregion;
                    console.log('Detected City:', city);
                    if (city) {
                        // Normalize city name if needed (e.g., match mock data keys)
                        // For this app, we mainly support Pune and New Delhi
                        if (city.includes('Pune') || city.includes('Pimpri')) {
                            setCurrentCity('Pune');
                        } else if (city.includes('Delhi') || city.includes('New Delhi')) {
                            setCurrentCity('New Delhi');
                        } else {
                            // If detected city is not in our data, keep it but maybe show empty state or default
                            setCurrentCity(city);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setErrorMsg('Error fetching location');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <LocationContext.Provider value={{ currentCity, setCurrentCity, location, errorMsg, loading }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
