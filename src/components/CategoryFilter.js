import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryFilter = ({
    categories,
    selectedCategory,
    onSelectCategory
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
                                    color={isSelected ? '#000' : '#AAA'}
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
        backgroundColor: '#121212',
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
        backgroundColor: '#2C2C2C',
        borderWidth: 1,
        borderColor: '#333',
    },
    categoryChipSelected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
    },
    categoryIcon: {
        marginRight: 6,
    },
    categoryText: {
        fontSize: 14,
        color: '#AAAAAA',
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default CategoryFilter;
