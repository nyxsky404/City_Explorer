import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePersonalization } from '../context/PersonalizationContext';


const ForYouSection = ({
    allItems,
    itemType,
    onItemPress,
    renderItem
}) => {
    const { getRecommendations, getItemRecommendationReason, favoriteCategories } = usePersonalization();

    const recommendations = getRecommendations(allItems, itemType);
    const hasFavorites = favoriteCategories[itemType]?.length > 0;

    if (recommendations.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="heart-outline" size={48} color="#ccc" />
                <Text style={styles.emptyTitle}>No Recommendations Yet</Text>
                <Text style={styles.emptyText}>
                    {hasFavorites
                        ? 'Check back soon for personalized suggestions!'
                        : 'Long press on categories to mark them as favorites and get personalized recommendations!'}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Ionicons name="sparkles" size={20} color="#FFD700" />
                    <Text style={styles.title}>For You</Text>
                </View>
                <Text style={styles.subtitle}>Personalized picks based on your interests</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {recommendations.map((item) => {
                    const reason = getItemRecommendationReason(item, itemType);

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => onItemPress && onItemPress(item)}
                        >

                            <View style={styles.badge}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                            </View>


                            {renderItem ? (
                                renderItem(item, reason)
                            ) : (
                                <View style={styles.defaultContent}>
                                    <Text style={styles.itemTitle} numberOfLines={2}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.itemCategory}>
                                        {itemType === 'events' ? item.category : item.cuisine}
                                    </Text>
                                    <View style={styles.reasonContainer}>
                                        <Ionicons name="information-circle-outline" size={14} color="#666" />
                                        <Text style={styles.reasonText} numberOfLines={1}>
                                            {reason}
                                        </Text>
                                    </View>
                                    {item.rating && (
                                        <Text style={styles.rating}>⭐ {item.rating}</Text>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        marginBottom: 8,
    },
    header: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginLeft: 28,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    card: {
        width: 200,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    defaultContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    itemCategory: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
    },
    reasonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8f4ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    reasonText: {
        fontSize: 11,
        color: '#0066cc',
        marginLeft: 4,
        flex: 1,
    },
    rating: {
        fontSize: 13,
        color: '#333',
    },
    emptyContainer: {
        backgroundColor: '#fff',
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 12,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default ForYouSection;
