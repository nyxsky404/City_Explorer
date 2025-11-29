import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryFilter = ({
    categories,
    selectedCategory,
    onSelectCategory,
    type
}) => {

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

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


                {categories.map((category) => {
                    const isSelected = selectedCategory === category.value;

                    return (
                        <TouchableOpacity
                            key={category.value}
                            style={[
                                styles.categoryChip,
                                isSelected && styles.categoryChipSelected
                            ]}
                            onPress={() => onSelectCategory(category.value)}
                        >
                            {category.icon && (
                                <Ionicons
                                    name={category.icon}
                                    size={18}
                                    color={isSelected ? '#fff' : '#555'}
                                    style={styles.categoryIcon}
                                />
                            )}
                            <Text style={[
                                styles.categoryText,
                                isSelected && styles.categoryTextSelected
                            ]}>
                                {category.label}
                            </Text>

                        </TouchableOpacity>
                    );
                })}
            </ScrollView>


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
    categoryIcon: {
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

});

export default CategoryFilter;
