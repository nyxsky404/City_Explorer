import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    RECENT_SEARCHES: '@personalization_recent_searches',
    FAVORITE_CATEGORIES: '@personalization_favorite_categories',
    VIEWED_ITEMS: '@personalization_viewed_items',
    USER_PREFERENCES: '@personalization_user_preferences',
};

const MAX_RECENT_SEARCHES = 10;
const MAX_VIEWED_ITEMS = 50;


export const saveRecentSearch = async (searchQuery) => {
    try {
        if (!searchQuery || searchQuery.trim() === '') return;

        const existing = await getRecentSearches();
        const filtered = existing.filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
        const updated = [searchQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES);

        await AsyncStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
        return updated;
    } catch (error) {
        console.error('Error saving recent search:', error);
        return [];
    }
};

export const getRecentSearches = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting recent searches:', error);
        return [];
    }
};

export const clearRecentSearches = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
        return true;
    } catch (error) {
        console.error('Error clearing recent searches:', error);
        return false;
    }
};


export const saveFavoriteCategories = async (categories) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_CATEGORIES, JSON.stringify(categories));
        return categories;
    } catch (error) {
        console.error('Error saving favorite categories:', error);
        return {};
    }
};

export const getFavoriteCategories = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_CATEGORIES);
        return data ? JSON.parse(data) : { events: [], food: [] };
    } catch (error) {
        console.error('Error getting favorite categories:', error);
        return { events: [], food: [] };
    }
};




export const saveViewedItem = async (item) => {
    try {
        const existing = await getViewedItems();
        const filtered = existing.filter(i => i.id !== item.id);
        const updated = [
            { ...item, viewedAt: new Date().toISOString() },
            ...filtered
        ].slice(0, MAX_VIEWED_ITEMS);

        await AsyncStorage.setItem(STORAGE_KEYS.VIEWED_ITEMS, JSON.stringify(updated));
        return updated;
    } catch (error) {
        console.error('Error saving viewed item:', error);
        return [];
    }
};

export const getViewedItems = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.VIEWED_ITEMS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting viewed items:', error);
        return [];
    }
};


export const generateRecommendations = (allItems, favoriteCategories, viewedItems, recentSearches, itemType) => {
    if (!allItems || allItems.length === 0) return [];

    const favoriteCats = favoriteCategories[itemType] || [];
    const viewedIds = new Set(viewedItems.map(item => item.id));


    const scoredItems = allItems.map(item => {
        let score = item.popularity || 0;


        if (itemType === 'events' && item.category) {
            const categoryName = item.category.replace(/[^\w\s]/g, '').trim();
            if (favoriteCats.includes(categoryName)) {
                score += 50;
            }
        } else if (itemType === 'food' && item.cuisine) {
            const cuisineName = item.cuisine.replace(/[^\w\s]/g, '').trim();
            if (favoriteCats.includes(cuisineName)) {
                score += 50;
            }
        }


        if (recentSearches && recentSearches.length > 0) {
            const searchMatch = recentSearches.some(search =>
                item.title?.toLowerCase().includes(search.toLowerCase()) ||
                item.description?.toLowerCase().includes(search.toLowerCase())
            );
            if (searchMatch) {
                score += 20;
            }
        }


        if (item.tags && favoriteCats.length > 0) {
            const tagMatches = item.tags.filter(tag => favoriteCats.includes(tag)).length;
            score += tagMatches * 15;
        }


        if (viewedIds.has(item.id)) {
            score -= 5;
        }

        return { ...item, recommendationScore: score };
    });


    return scoredItems
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 10);
};


export const getRecommendationReason = (item, favoriteCategories, itemType) => {
    const favoriteCats = favoriteCategories[itemType] || [];

    if (itemType === 'events' && item.category) {
        const categoryName = item.category.replace(/[^\w\s]/g, '').trim();
        if (favoriteCats.includes(categoryName)) {
            return `Based on your interest in ${item.category}`;
        }
    } else if (itemType === 'food' && item.cuisine) {
        const cuisineName = item.cuisine.replace(/[^\w\s]/g, '').trim();
        if (favoriteCats.includes(cuisineName)) {
            return `Based on your love for ${item.cuisine}`;
        }
    }

    if (item.tags && favoriteCats.length > 0) {
        const matchingTag = item.tags.find(tag => favoriteCats.includes(tag));
        if (matchingTag) {
            return `You might like this`;
        }
    }

    return 'Popular in your area';
};


export const clearAllPersonalizationData = async () => {
    try {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.RECENT_SEARCHES,
            STORAGE_KEYS.FAVORITE_CATEGORIES,
            STORAGE_KEYS.VIEWED_ITEMS,
            STORAGE_KEYS.USER_PREFERENCES,
        ]);
        return true;
    } catch (error) {
        console.error('Error clearing personalization data:', error);
        return false;
    }
};
