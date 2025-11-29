import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedContext = createContext({});

const SAVED_ITEMS_KEY = '@city_explorer_saved_items';

export const SavedProvider = ({ children }) => {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSavedItems();
    }, []);

    const loadSavedItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem(SAVED_ITEMS_KEY);
            if (storedItems) {
                setSavedItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error('Error loading saved items:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveItem = async (item, type) => {
        try {
            const newItem = {
                id: item.id,
                type,
                dateSaved: new Date().toISOString(),
            };

            const updatedItems = [...savedItems, newItem];
            setSavedItems(updatedItems);
            await AsyncStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updatedItems));
            return true;
        } catch (error) {
            console.error('Error saving item:', error);
            return false;
        }
    };

    const unsaveItem = async (itemId) => {
        try {
            const updatedItems = savedItems.filter(item => item.id !== itemId);
            setSavedItems(updatedItems);
            await AsyncStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updatedItems));
            return true;
        } catch (error) {
            console.error('Error unsaving item:', error);
            return false;
        }
    };

    const isSaved = (itemId) => {
        return savedItems.some(item => item.id === itemId);
    };

    return (
        <SavedContext.Provider
            value={{
                savedItems,
                loading,
                saveItem,
                unsaveItem,
                isSaved,
            }}
        >
            {children}
        </SavedContext.Provider>
    );
};

export const useSaved = () => {
    const context = useContext(SavedContext);
    if (!context) {
        throw new Error('useSaved must be used within a SavedProvider');
    }
    return context;
};
