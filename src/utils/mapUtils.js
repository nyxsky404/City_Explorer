import { Linking, Platform, Alert } from 'react-native';


export const openMapsWithDirections = (latitude, longitude, label = '', travelMode = 'd') => {
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });

    const latLng = `${latitude},${longitude}`;
    const labelEncoded = encodeURIComponent(label);

    let url;

    if (Platform.OS === 'ios') {

        url = `${scheme}${labelEncoded}@${latLng}&dirflg=${travelMode}`;
    } else {

        url = `${scheme}${latLng}(${labelEncoded})&travelmode=${travelMode === 'd' ? 'driving' : travelMode === 'w' ? 'walking' : 'transit'}`;
    }

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {

                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latLng}&travelmode=${travelMode === 'd' ? 'driving' : travelMode === 'w' ? 'walking' : 'transit'}`;
                return Linking.openURL(googleMapsUrl);
            }
        })
        .catch((err) => {
            console.error('Error opening maps:', err);
            Alert.alert('Error', 'Unable to open maps application');
        });
};


export const getRegionForMarkers = (markers) => {
    if (!markers || markers.length === 0) {
        return {
            latitude: 28.6139,
            longitude: 77.2090,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
        };
    }

    let minLat = markers[0].latitude;
    let maxLat = markers[0].latitude;
    let minLng = markers[0].longitude;
    let maxLng = markers[0].longitude;

    markers.forEach((marker) => {
        minLat = Math.min(minLat, marker.latitude);
        maxLat = Math.max(maxLat, marker.latitude);
        minLng = Math.min(minLng, marker.longitude);
        maxLng = Math.max(maxLng, marker.longitude);
    });

    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat) * 1.5;
    const deltaLng = (maxLng - minLng) * 1.5;

    return {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: Math.max(deltaLat, 0.05),
        longitudeDelta: Math.max(deltaLng, 0.05),
    };
};


export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};


const toRad = (degrees) => {
    return degrees * (Math.PI / 180);
};


export const formatDistance = (distanceInKm) => {
    if (distanceInKm < 1) {
        return `${Math.round(distanceInKm * 1000)}m`;
    }
    return `${distanceInKm.toFixed(1)}km`;
};
