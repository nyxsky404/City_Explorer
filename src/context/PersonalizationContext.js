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


    const addRecentSearch = useCallback(async (searchQuery) => {
        try {
            const updated = await saveRecentSearch(searchQuery);
            setRecentSearches(updated);
        } catch (error) {
            console.error('Error adding recent search:', error);
        }
    }, []);


    const clearSearchHistory = useCallback(async () => {
        try {
            await clearRecentSearches();
            setRecentSearches([]);
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    }, []);


    const toggleFavoriteCategory = useCallback(async (type, category) => {
        try {
            const updated = await toggleFavoriteCategoryService(type, category);
            setFavoriteCategories(updated);
        } catch (error) {
            console.error('Error toggling favorite category:', error);
        }
    }, []);


    const isFavoriteCategory = useCallback((type, category) => {
        return favoriteCategories[type]?.includes(category) || false;
    }, [favoriteCategories]);


    const trackViewedItem = useCallback(async (item) => {
        try {
            const updated = await saveViewedItem(item);
            setViewedItems(updated);
        } catch (error) {
            console.error('Error tracking viewed item:', error);
        }
    }, []);


    const getRecommendations = useCallback((allItems, itemType) => {
        return generateRecommendations(
            allItems,
            favoriteCategories,
            viewedItems,
            recentSearches,
            itemType
        );
    }, [favoriteCategories, viewedItems, recentSearches]);


    const getItemRecommendationReason = useCallback((item, itemType) => {
        return getRecommendationReason(item, favoriteCategories, itemType);
    }, [favoriteCategories]);


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

                recentSearches,
                favoriteCategories,
                viewedItems,
                loading,


                addRecentSearch,
                clearSearchHistory,


                toggleFavoriteCategory,
                isFavoriteCategory,


                trackViewedItem,


                getRecommendations,
                getItemRecommendationReason,


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
