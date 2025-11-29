import AsyncStorage from '@react-native-async-storage/async-storage';

const REVIEWS_KEY = '@city_explorer_reviews';

const CHECKINS_KEY = '@city_explorer_checkins';




export const getReviews = async (itemId) => {
    try {
        const reviewsJson = await AsyncStorage.getItem(REVIEWS_KEY);
        const allReviews = reviewsJson ? JSON.parse(reviewsJson) : {};
        return allReviews[itemId] || [];
    } catch (error) {
        console.error('Error getting reviews:', error);
        return [];
    }
};


export const addReview = async (itemId, review) => {
    try {
        const reviewsJson = await AsyncStorage.getItem(REVIEWS_KEY);
        const allReviews = reviewsJson ? JSON.parse(reviewsJson) : {};

        if (!allReviews[itemId]) {
            allReviews[itemId] = [];
        }

        const newReview = {
            id: Date.now().toString(),
            ...review,
            date: new Date().toISOString(),
        };

        allReviews[itemId].unshift(newReview);
        await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));

        return { success: true, review: newReview };
    } catch (error) {
        console.error('Error adding review:', error);
        return { success: false, error: error.message };
    }
};


export const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};









export const getCheckInCount = async (itemId) => {
    try {
        const checkInsJson = await AsyncStorage.getItem(CHECKINS_KEY);
        const allCheckIns = checkInsJson ? JSON.parse(checkInsJson) : {};
        return allCheckIns[itemId]?.count || 0;
    } catch (error) {
        console.error('Error getting check-in count:', error);
        return 0;
    }
};


export const hasUserCheckedIn = async (itemId, userId) => {
    try {
        const checkInsJson = await AsyncStorage.getItem(CHECKINS_KEY);
        const allCheckIns = checkInsJson ? JSON.parse(checkInsJson) : {};

        if (!allCheckIns[itemId]) return false;

        return allCheckIns[itemId].users?.includes(userId) || false;
    } catch (error) {
        console.error('Error checking user check-in:', error);
        return false;
    }
};


export const addCheckIn = async (itemId, userId, userName = 'Anonymous') => {
    try {
        const checkInsJson = await AsyncStorage.getItem(CHECKINS_KEY);
        const allCheckIns = checkInsJson ? JSON.parse(checkInsJson) : {};

        if (!allCheckIns[itemId]) {
            allCheckIns[itemId] = {
                count: 0,
                users: [],
                checkIns: [],
            };
        }


        if (allCheckIns[itemId].users.includes(userId)) {
            return { success: false, error: 'Already checked in' };
        }

        allCheckIns[itemId].count += 1;
        allCheckIns[itemId].users.push(userId);
        allCheckIns[itemId].checkIns.push({
            userId,
            userName,
            date: new Date().toISOString(),
        });

        await AsyncStorage.setItem(CHECKINS_KEY, JSON.stringify(allCheckIns));

        return { success: true, count: allCheckIns[itemId].count };
    } catch (error) {
        console.error('Error adding check-in:', error);
        return { success: false, error: error.message };
    }
};


export const getRecentCheckIns = async (itemId, limit = 5) => {
    try {
        const checkInsJson = await AsyncStorage.getItem(CHECKINS_KEY);
        const allCheckIns = checkInsJson ? JSON.parse(checkInsJson) : {};

        if (!allCheckIns[itemId]) return [];

        return allCheckIns[itemId].checkIns.slice(0, limit);
    } catch (error) {
        console.error('Error getting recent check-ins:', error);
        return [];
    }
};
