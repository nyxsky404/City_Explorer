import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@city_explorer_users';
const CURRENT_USER_KEY = '@city_explorer_current_user';


export const getAllUsers = async () => {
    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
};


const saveAllUsers = async (users) => {
    try {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Error saving users:', error);
        return false;
    }
};


export const registerUser = async (userData) => {
    try {
        const { name, email, password } = userData;


        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }


        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }


        const users = await getAllUsers();


        const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            throw new Error('User with this email already exists');
        }


        const newUser = {
            id: Date.now().toString(),
            name,
            email: email.toLowerCase(),
            password,
            createdAt: new Date().toISOString(),
        };


        users.push(newUser);
        await saveAllUsers(users);


        const { password: _, ...userWithoutPassword } = newUser;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const authenticateUser = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const users = await getAllUsers();
        const user = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
            throw new Error('Invalid email or password');
        }


        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const saveUser = async (userData) => {
    try {
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
        return true;
    } catch (error) {
        console.error('Error saving current user:', error);
        return false;
    }
};


export const getUser = async () => {
    try {
        const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};


export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(CURRENT_USER_KEY);
        return true;
    } catch (error) {
        console.error('Error removing user:', error);
        return false;
    }
};
