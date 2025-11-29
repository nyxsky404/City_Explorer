import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { openMapsWithDirections } from '../utils/mapUtils';
import {
    getReviews,
    addReview,
    getCheckInCount,
    hasUserCheckedIn,
    addCheckIn,
    calculateAverageRating
} from '../utils/socialService';
import ReviewCard from '../components/ReviewCard';
import SocialActions from '../components/SocialActions';
import AddReviewModal from '../components/AddReviewModal';
import { useSaved } from '../context/SavedContext';

const FoodDetailScreen = ({ route, navigation }) => {
    const { restaurant } = route.params;
    const [reviews, setReviews] = useState(restaurant.reviews || []);
    const [checkInCount, setCheckInCount] = useState(restaurant.checkIns || 0);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [averageRating, setAverageRating] = useState(restaurant.rating || 0);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isSaved, saveItem, unsaveItem } = useSaved();
    const saved = isSaved(restaurant.id);

    const handleToggleSave = async () => {
        if (saved) {
            await unsaveItem(restaurant.id);
        } else {
            await saveItem(restaurant, 'food');
        }
    };


    useEffect(() => {
        loadSocialData();
    }, []);

    const loadSocialData = async () => {
        const storedReviews = await getReviews(restaurant.id);
        if (storedReviews.length > 0) {
            setReviews([...(restaurant.reviews || []), ...storedReviews]);

            const allReviews = [...(restaurant.reviews || []), ...storedReviews];
            setAverageRating(calculateAverageRating(allReviews));
        }



        const storedCheckIns = await getCheckInCount(restaurant.id);
        if (storedCheckIns > 0) {
            setCheckInCount((restaurant.checkIns || 0) + storedCheckIns);
        }

        const checkedIn = await hasUserCheckedIn(restaurant.id, 'current-user-id');
        setIsCheckedIn(checkedIn);
    };

    const handleGetDirections = (mode) => {
        openMapsWithDirections(
            restaurant.latitude,
            restaurant.longitude,
            restaurant.title,
            mode
        );
    };

    const handleCheckIn = async () => {
        const result = await addCheckIn(restaurant.id, 'current-user-id', 'You');
        if (result.success) {
            setCheckInCount(prev => prev + 1);
            setIsCheckedIn(true);
            Alert.alert('Success', 'You have successfully checked in!');
        } else {
            Alert.alert('Error', result.error);
        }
    };

    const handleAddReview = async (reviewData) => {
        setIsSubmitting(true);
        const result = await addReview(restaurant.id, {
            ...reviewData,
            userName: 'You',
        });

        if (result.success) {
            const newReviews = [result.review, ...reviews];
            setReviews(newReviews);
            setAverageRating(calculateAverageRating(newReviews));
            setShowReviewModal(false);
            Alert.alert('Success', 'Your review has been posted!');
        } else {
            Alert.alert('Error', 'Failed to post review');
        }
        setIsSubmitting(false);
    };



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Restaurant Details</Text>
                    <TouchableOpacity onPress={handleToggleSave}>
                        <Ionicons
                            name={saved ? "bookmark" : "bookmark-outline"}
                            size={24}
                            color={saved ? "#007AFF" : "#333"}
                        />
                    </TouchableOpacity>
                </View>


                <View style={styles.content}>
                    <Text style={styles.title}>{restaurant.title}</Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={18} color="#FFD700" />
                        <Text style={styles.rating}>{averageRating} ({reviews.length} reviews)</Text>
                        <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="restaurant-outline" size={20} color="#FF6B6B" />
                            <Text style={styles.infoText}>{restaurant.cuisine}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={20} color="#FF6B6B" />
                            <Text style={styles.infoText}>{restaurant.location}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="time-outline" size={20} color="#FF6B6B" />
                            <Text style={styles.infoText}>{restaurant.hours}</Text>
                        </View>
                    </View>


                    <SocialActions
                        onCheckIn={handleCheckIn}
                        onAddReview={() => setShowReviewModal(true)}
                        checkInCount={checkInCount}
                        isCheckedIn={isCheckedIn}
                        itemTitle={restaurant.title}
                    />



                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>About</Text>
                        <Text style={styles.description}>{restaurant.description}</Text>
                    </View>


                    <View style={styles.mapSection}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: restaurant.latitude,
                                longitude: restaurant.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            provider={PROVIDER_GOOGLE}
                            scrollEnabled={false}
                            zoomEnabled={false}
                        >
                            <Marker
                                coordinate={{
                                    latitude: restaurant.latitude,
                                    longitude: restaurant.longitude,
                                }}
                                pinColor="#FF6B6B"
                            />
                        </MapView>
                    </View>


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


                    <View style={styles.reviewsSection}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))
                        ) : (
                            <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            <AddReviewModal
                visible={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onSubmit={handleAddReview}
                isSubmitting={isSubmitting}
            />


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
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    rating: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    priceRange: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
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
    section: {
        marginBottom: 20,
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
        marginBottom: 30,
    },
    directionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6B6B',
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
    reviewsSection: {
        marginBottom: 40,
    },
    noReviewsText: {
        fontSize: 16,
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default FoodDetailScreen;
