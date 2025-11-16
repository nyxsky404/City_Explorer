import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Ionicons
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
            />
        ));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {review.userName ? review.userName.charAt(0).toUpperCase() : 'A'}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>{review.userName || 'Anonymous'}</Text>
                        <Text style={styles.date}>{formatDate(review.date)}</Text>
                    </View>
                </View>
                <View style={styles.rating}>
                    {renderStars(review.rating)}
                </View>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
    },
    comment: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});

export default ReviewCard;
