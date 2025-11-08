import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { openMapsWithDirections } from '../utils/mapUtils';

const EventDetailScreen = ({ route, navigation }) => {
    const { event } = route.params;

    const handleGetDirections = (mode) => {
        openMapsWithDirections(event.latitude, event.longitude, event.title, mode);
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Event Details</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Event Info */}
                <View style={styles.content}>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.category}>{event.category}</Text>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={20} color="#007AFF" />
                            <Text style={styles.infoText}>{event.date}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="time-outline" size={20} color="#007AFF" />
                            <Text style={styles.infoText}>{event.time}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={20} color="#007AFF" />
                            <Text style={styles.infoText}>{event.location}</Text>
                        </View>
                    </View>

                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>About</Text>
                        <Text style={styles.description}>{event.description}</Text>
                    </View>

                    {/* Map */}
                    <View style={styles.mapSection}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: event.latitude,
                                longitude: event.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            provider={PROVIDER_GOOGLE}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{
                                    latitude: event.latitude,
                                    longitude: event.longitude,
                                }}
                                pinColor="#007AFF"
                            />
                        </MapView>
                    </View>

                    {/* Directions Buttons */}
                    <View style={styles.directionsSection}>
                        <TouchableOpacity
                            style={styles.directionButton}
                            onPress={() => handleGetDirections('w')}
                        >
                            <Ionicons name="walk" size={24} color="#fff" />
                            <Text style={styles.directionButtonText}>Walking Directions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.directionButton, styles.drivingButton]}
                            onPress={() => handleGetDirections('d')}
                        >
                            <Ionicons name="car" size={24} color="#fff" />
                            <Text style={styles.directionButtonText}>Driving Directions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    placeholder: {
        width: 32,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    infoSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    descriptionSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    mapSection: {
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    directionsSection: {
        gap: 12,
        marginBottom: 20,
    },
    directionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        gap: 10,
    },
    drivingButton: {
        backgroundColor: '#34C759',
    },
    directionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default EventDetailScreen;
