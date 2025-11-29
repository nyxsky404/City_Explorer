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
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
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
        backgroundColor: '#2C2C2C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    date: {
        fontSize: 12,
        color: '#AAAAAA',
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
    },
    comment: {
        fontSize: 14,
        color: '#CCCCCC',
        lineHeight: 20,
    },
});

export default ReviewCard;
