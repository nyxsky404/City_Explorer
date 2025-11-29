import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockEvents } from '../data/eventsData';
import { mockFood } from '../data/foodData';
import { openMapsWithDirections, getRegionForMarkers } from '../utils/mapUtils';

const MapScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEvents, setShowEvents] = useState(true);
    const [showFood, setShowFood] = useState(true);
    const mapRef = useRef(null);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Location Permission',
                    'Location permission is required to show your position on the map.',
                    [{ text: 'OK' }]
                );
                setLoading(false);
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error getting location:', error);
            setLoading(false);

            setLocation({
                latitude: 28.6139,
                longitude: 77.2090,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            });
        }
    };

    const centerOnUser = async () => {
        try {
            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const region = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };

            mapRef.current?.animateToRegion(region, 1000);
            setLocation(region);
        } catch (error) {
            Alert.alert('Error', 'Unable to get current location');
        }
    };

    const handleMarkerPress = (item) => {

        mapRef.current?.animateToRegion(
            {
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            500
        );
    };

    const handleGetDirections = (item) => {
        openMapsWithDirections(
            item.latitude,
            item.longitude,
            item.title,
            'd'
        );
    };

    const handleCalloutPress = (item) => {
        if (item.type === 'event') {
            navigation.navigate('EventDetail', { event: item });
        } else {
            navigation.navigate('FoodDetail', { restaurant: item });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading map...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.heading}>Explore Map</Text>
                <Text style={styles.subheading}>Discover nearby events and restaurants</Text>
            </View>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, showEvents && styles.filterButtonActive]}
                    onPress={() => setShowEvents(!showEvents)}
                >
                    <Ionicons
                        name="calendar"
                        size={16}
                        color={showEvents ? '#fff' : '#007AFF'}
                    />
                    <Text style={[styles.filterText, showEvents && styles.filterTextActive]}>
                        Events
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, showFood && styles.filterButtonActive]}
                    onPress={() => setShowFood(!showFood)}
                >
                    <Ionicons
                        name="restaurant"
                        size={16}
                        color={showFood ? '#fff' : '#FF6B6B'}
                    />
                    <Text style={[styles.filterText, showFood && styles.filterTextActive]}>
                        Restaurants
                    </Text>
                </TouchableOpacity>
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={location}
                showsUserLocation={true}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
            >

                {showEvents &&
                    mockEvents.map((event) => (
                        <Marker
                            key={event.id}
                            coordinate={{
                                latitude: event.latitude,
                                longitude: event.longitude,
                            }}
                            pinColor="#007AFF"
                            onPress={() => handleMarkerPress(event)}
                        >
                            <Callout
                                onPress={() => handleCalloutPress(event)}
                                style={styles.callout}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{event.title}</Text>
                                    <Text style={styles.calloutCategory}>{event.category}</Text>
                                    <Text style={styles.calloutDescription} numberOfLines={2}>
                                        {event.description}
                                    </Text>
                                    <Text style={styles.calloutDate}>
                                        📅 {event.date} • {event.time}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.directionsButton}
                                        onPress={() => handleGetDirections(event)}
                                    >
                                        <Ionicons name="navigate" size={16} color="#007AFF" />
                                        <Text style={styles.directionsText}>Get Directions</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    ))}


                {showFood &&
                    mockFood.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            coordinate={{
                                latitude: restaurant.latitude,
                                longitude: restaurant.longitude,
                            }}
                            pinColor="#FF6B6B"
                            onPress={() => handleMarkerPress(restaurant)}
                        >
                            <Callout
                                onPress={() => handleCalloutPress(restaurant)}
                                style={styles.callout}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{restaurant.title}</Text>
                                    <Text style={styles.calloutCategory}>{restaurant.cuisine}</Text>
                                    <Text style={styles.calloutRating}>⭐ {restaurant.rating}</Text>
                                    <Text style={styles.calloutDescription} numberOfLines={2}>
                                        {restaurant.description}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.directionsButton}
                                        onPress={() => handleGetDirections(restaurant)}
                                    >
                                        <Ionicons name="navigate" size={16} color="#FF6B6B" />
                                        <Text style={styles.directionsText}>Get Directions</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
            </MapView>


            <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
                <Ionicons name="locate" size={24} color="#007AFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
    },
    heading: {
        color: '#333333',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subheading: {
        fontSize: 16,
        color: '#666666',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
        gap: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        gap: 6,
    },
    filterButtonActive: {
        backgroundColor: '#007AFF',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    filterTextActive: {
        color: '#fff',
    },
    map: {
        flex: 1,
    },
    callout: {
        width: 250,
    },
    calloutContainer: {
        padding: 10,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    calloutCategory: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    calloutRating: {
        fontSize: 13,
        color: '#333',
        marginBottom: 4,
    },
    calloutDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    calloutDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    directionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        gap: 6,
        alignSelf: 'flex-start',
    },
    directionsText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
    },
    centerButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default MapScreen;
