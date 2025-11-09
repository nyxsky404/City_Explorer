import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePersonalization } from '../context/PersonalizationContext';

/**
 * CategoryFilter component with favorite functionality
 * @param {Array} categories - Array of category objects {label, value, icon}
 * @param {String} selectedCategory - Currently selected category
 * @param {Function} onSelectCategory - Callback when category selected
 * @param {String} type - Type of categories ('events' or 'food')
 */
const CategoryFilter = ({
    categories,
    selectedCategory,
    onSelectCategory,
    type
}) => {
    const { toggleFavoriteCategory, isFavoriteCategory } = usePersonalization();

    const handleLongPress = (category) => {
        toggleFavoriteCategory(type, category.value);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* All Categories Option */}
                <TouchableOpacity
                    style={[
                        styles.categoryChip,
                        !selectedCategory && styles.categoryChipSelected
                    ]}
                    onPress={() => onSelectCategory(null)}
                >
                    <Text style={[
                        styles.categoryText,
                        !selectedCategory && styles.categoryTextSelected
                    ]}>
                        All
                    </Text>
                </TouchableOpacity>

                {/* Category Options */}
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.value;
                    const isFavorite = isFavoriteCategory(type, category.value);

                    return (
                        <TouchableOpacity
                            key={category.value}
                            style={[
                                styles.categoryChip,
                                isSelected && styles.categoryChipSelected,
                                isFavorite && styles.categoryChipFavorite
                            ]}
                            onPress={() => onSelectCategory(category.value)}
                            onLongPress={() => handleLongPress(category)}
                            delayLongPress={500}
                        >
                            {category.icon && (
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                            )}
                            <Text style={[
                                styles.categoryText,
                                isSelected && styles.categoryTextSelected
                            ]}>
                                {category.label}
                            </Text>
                            {isFavorite && (
                                <Ionicons
                                    name="heart"
                                    size={12}
                                    color={isSelected ? '#fff' : '#FF6B6B'}
                                    style={styles.favoriteIcon}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <Text style={styles.hint}>Long press to favorite</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 8,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    categoryChipSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    categoryChipFavorite: {
        borderColor: '#FF6B6B',
        borderWidth: 2,
    },
    categoryIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#fff',
    },
    favoriteIcon: {
        marginLeft: 4,
    },
    hint: {
        fontSize: 11,
        color: '#999',
        textAlign: 'center',
        marginTop: 4,
        fontStyle: 'italic',
    },
});

export default CategoryFilter;
