import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * SearchBar component with filter button
 * @param {String} searchText - Current search text
 * @param {Function} onSearchChange - Callback when search text changes
 * @param {Function} onFilterPress - Callback when filter button pressed
 * @param {Number} filterCount - Number of active filters
 * @param {String} placeholder - Placeholder text
 */
const SearchBar = ({
    searchText,
    onSearchChange,
    onFilterPress,
    filterCount = 0,
    placeholder = 'Search...'
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={onSearchChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onSearchChange('')}
                        style={styles.clearButton}
                    >
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                style={styles.filterButton}
                onPress={onFilterPress}
            >
                <Ionicons name="options-outline" size={24} color="#333" />
                {filterCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{filterCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    clearButton: {
        padding: 4,
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default SearchBar;
