import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SocialActions = ({
    onCheckIn,
    onAddReview,
    checkInCount,
    isCheckedIn,
    itemTitle
}) => {

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${itemTitle} on City Explorer!`,
                title: `Share ${itemTitle}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.actionButton, isCheckedIn && styles.activeButton]}
                onPress={onCheckIn}
                disabled={isCheckedIn}
            >
                <Ionicons
                    name={isCheckedIn ? "checkmark-circle" : "location-outline"}
                    size={24}
                    color={isCheckedIn ? "white" : "#FFFFFF"}
                />
                <Text style={[styles.actionText, isCheckedIn && styles.activeText]}>
                    {isCheckedIn ? 'Checked In' : 'Check In'}
                </Text>
                <Text style={[styles.countText, isCheckedIn && styles.activeText]}>
                    ({checkInCount})
                </Text>
            </TouchableOpacity>

            <View style={styles.iconRow}>


                <TouchableOpacity style={styles.iconButton} onPress={onAddReview}>
                    <Ionicons name="create-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.iconText}>Review</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                    <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C2C2C',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    activeButton: {
        backgroundColor: '#266E3F',
        borderColor: '#266E3F',
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
        marginRight: 4,
    },
    activeText: {
        color: 'white',
    },
    countText: {
        fontSize: 14,
        color: '#AAAAAA',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 16,
    },
    iconButton: {
        alignItems: 'center',
        gap: 4,
    },
    iconText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',
    },
});

export default SocialActions;
