import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

/**
 * Request notification permissions from the user
 */
export async function requestNotificationPermissions() {
    if (!Device.isDevice) {
        console.log('Must use physical device for Push Notifications');
        return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
    }

    // Configure notification channel for Android
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return true;
}

/**
 * Schedule a notification for an event reminder
 * @param {Object} event - Event object with id, title, date, time
 * @param {number} minutesBefore - How many minutes before event to send reminder
 */
export async function scheduleEventReminder(event, minutesBefore = 60) {
    try {
        // Parse event date and time
        const eventDateTime = new Date(`${event.date} ${event.time.split(' - ')[0]}`);
        const reminderTime = new Date(eventDateTime.getTime() - minutesBefore * 60000);

        // Don't schedule if reminder time is in the past
        if (reminderTime < new Date()) {
            console.log('Reminder time is in the past, skipping');
            return null;
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: '📅 Event Reminder',
                body: `${event.title} starts in ${minutesBefore} minutes at ${event.location}`,
                data: {
                    type: 'event_reminder',
                    eventId: event.id,
                    event: event
                },
                sound: true,
            },
            trigger: {
                date: reminderTime,
            },
        });

        return notificationId;
    } catch (error) {
        console.error('Error scheduling event reminder:', error);
        return null;
    }
}

/**
 * Send immediate notification for special offer
 * @param {Object} restaurant - Restaurant object with offer details
 */
export async function sendSpecialOfferNotification(restaurant) {
    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: '🎉 Special Offer!',
                body: `${restaurant.title}: ${restaurant.offerDescription}`,
                data: {
                    type: 'special_offer',
                    restaurantId: restaurant.id,
                    restaurant: restaurant
                },
                sound: true,
            },
            trigger: null, // Send immediately
        });

        return notificationId;
    } catch (error) {
        console.error('Error sending special offer notification:', error);
        return null;
    }
}

/**
 * Send notification for new addition nearby
 * @param {Object} item - Event or restaurant object
 * @param {string} itemType - 'event' or 'food'
 */
export async function sendNewAdditionNotification(item, itemType) {
    try {
        const emoji = itemType === 'event' ? '🎪' : '🍽️';
        const typeLabel = itemType === 'event' ? 'Event' : 'Restaurant';

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `${emoji} New ${typeLabel} Nearby!`,
                body: `Check out ${item.title} at ${item.location}`,
                data: {
                    type: 'new_addition',
                    itemType: itemType,
                    itemId: item.id,
                    item: item
                },
                sound: true,
            },
            trigger: null, // Send immediately
        });

        return notificationId;
    } catch (error) {
        console.error('Error sending new addition notification:', error);
        return null;
    }
}

/**
 * Cancel a scheduled notification
 * @param {string} notificationId - ID of notification to cancel
 */
export async function cancelNotification(notificationId) {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        return true;
    } catch (error) {
        console.error('Error canceling notification:', error);
        return false;
    }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        return true;
    } catch (error) {
        console.error('Error canceling all notifications:', error);
        return false;
    }
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications() {
    try {
        const notifications = await Notifications.getAllScheduledNotificationsAsync();
        return notifications;
    } catch (error) {
        console.error('Error getting scheduled notifications:', error);
        return [];
    }
}

/**
 * Set up notification response listener
 * @param {Function} callback - Function to call when notification is tapped
 */
export function addNotificationResponseListener(callback) {
    return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Set up notification received listener (when app is in foreground)
 * @param {Function} callback - Function to call when notification is received
 */
export function addNotificationReceivedListener(callback) {
    return Notifications.addNotificationReceivedListener(callback);
}
