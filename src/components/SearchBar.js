import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePersonalization } from '../context/PersonalizationContext';


const SearchBar = ({
    searchText,
    onSearchChange,
    onFilterPress,
    filterCount = 0,
    placeholder = 'Search...',
    enableRecentSearches = true
}) => {
    const [showRecent, setShowRecent] = useState(false);
    const { recentSearches, addRecentSearch, clearSearchHistory } = usePersonalization();

    const handleSearchSubmit = () => {
        if (searchText.trim() && enableRecentSearches) {
            addRecentSearch(searchText.trim());
        }
        setShowRecent(false);
    };

    const handleRecentSearchPress = (search) => {
        onSearchChange(search);
        setShowRecent(false);
    };

    const handleFocus = () => {
        if (enableRecentSearches && recentSearches.length > 0) {
            setShowRecent(true);
        }
    };

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
                    onFocus={handleFocus}
                    onSubmitEditing={handleSearchSubmit}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
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


            {showRecent && enableRecentSearches && recentSearches.length > 0 && (
                <>
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowRecent(false)}
                    />
                    <View style={styles.recentContainer}>
                        <View style={styles.recentHeader}>
                            <Text style={styles.recentTitle}>Recent Searches</Text>
                            <TouchableOpacity onPress={() => {
                                clearSearchHistory();
                                setShowRecent(false);
                            }}>
                                <Text style={styles.clearText}>Clear All</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={recentSearches}
                            keyExtractor={(item, index) => `recent-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.recentItem}
                                    onPress={() => handleRecentSearchPress(item)}
                                >
                                    <Ionicons name="time-outline" size={16} color="#666" />
                                    <Text style={styles.recentText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            scrollEnabled={false}
                        />
                    </View>
                </>
            )}
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
        zIndex: 1000,
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
    backdrop: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        bottom: -1000,
        backgroundColor: 'transparent',
        zIndex: 999,
    },
    recentContainer: {
        position: 'absolute',
        top: 70,
        left: 16,
        right: 72,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        maxHeight: 250,
        zIndex: 1001,
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    clearText: {
        fontSize: 12,
        color: '#007AFF',
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 4,
    },
    recentText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
});

export default SearchBar;
