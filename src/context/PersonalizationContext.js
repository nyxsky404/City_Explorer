import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
    saveRecentSearch,
    getRecentSearches,
    clearRecentSearches,
    getFavoriteCategories,
    toggleFavoriteCategory as toggleFavoriteCategoryService,
    saveViewedItem,
    getViewedItems,
    generateRecommendations,
    getRecommendationReason,
    clearAllPersonalizationData,
} from '../utils/personalizationService';

const PersonalizationContext = createContext({});

export const PersonalizationProvider = ({ children }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [favoriteCategories, setFavoriteCategories] = useState({ events: [], food: [] });
    const [viewedItems, setViewedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load personalization data on mount
    useEffect(() => {
        loadPersonalizationData();
    }, []);

    const loadPersonalizationData = async () => {
        try {
            const [searches, favorites, viewed] = await Promise.all([
                getRecentSearches(),
                getFavoriteCategories(),
                getViewedItems(),
            ]);

            setRecentSearches(searches);
            setFavoriteCategories(favorites);
            setViewedItems(viewed);
        } catch (error) {
            console.error('Error loading personalization data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add search to recent searches
    const addRecentSearch = useCallback(async (searchQuery) => {
        try {
            const updated = await saveRecentSearch(searchQuery);
            setRecentSearches(updated);
        } catch (error) {
            console.error('Error adding recent search:', error);
        }
    }, []);

    // Clear recent searches
    const clearSearchHistory = useCallback(async () => {
        try {
            await clearRecentSearches();
            setRecentSearches([]);
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    }, []);

    // Toggle favorite category
    const toggleFavoriteCategory = useCallback(async (type, category) => {
        try {
            const updated = await toggleFavoriteCategoryService(type, category);
            setFavoriteCategories(updated);
        } catch (error) {
            console.error('Error toggling favorite category:', error);
        }
    }, []);

    // Check if category is favorite
    const isFavoriteCategory = useCallback((type, category) => {
        return favoriteCategories[type]?.includes(category) || false;
    }, [favoriteCategories]);

    // Track viewed item
    const trackViewedItem = useCallback(async (item) => {
        try {
            const updated = await saveViewedItem(item);
            setViewedItems(updated);
        } catch (error) {
            console.error('Error tracking viewed item:', error);
        }
    }, []);

    // Get recommendations for a specific type
    const getRecommendations = useCallback((allItems, itemType) => {
        return generateRecommendations(
            allItems,
            favoriteCategories,
            viewedItems,
            recentSearches,
            itemType
        );
    }, [favoriteCategories, viewedItems, recentSearches]);

    // Get recommendation reason for an item
    const getItemRecommendationReason = useCallback((item, itemType) => {
        return getRecommendationReason(item, favoriteCategories, itemType);
    }, [favoriteCategories]);

    // Clear all personalization data
    const clearAllData = useCallback(async () => {
        try {
            await clearAllPersonalizationData();
            setRecentSearches([]);
            setFavoriteCategories({ events: [], food: [] });
            setViewedItems([]);
        } catch (error) {
            console.error('Error clearing all data:', error);
        }
    }, []);

    return (
        <PersonalizationContext.Provider
            value={{
                // State
                recentSearches,
                favoriteCategories,
                viewedItems,
                loading,

                // Search functions
                addRecentSearch,
                clearSearchHistory,

                // Category functions
                toggleFavoriteCategory,
                isFavoriteCategory,

                // Tracking functions
                trackViewedItem,

                // Recommendation functions
                getRecommendations,
                getItemRecommendationReason,

                // Utility functions
                clearAllData,
            }}
        >
            {children}
        </PersonalizationContext.Provider>
    );
};

export const usePersonalization = () => {
    const context = useContext(PersonalizationContext);
    if (!context) {
        throw new Error('usePersonalization must be used within a PersonalizationProvider');
    }
    return context;
};
