import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import EventsScreen from './src/screens/EventsScreen';
import FoodScreen from './src/screens/FoodScreen';
import SavedScreen from './src/screens/SavedScreen';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Events" component={EventsScreen}
          options={{
            title: 'Events',
            headerShown: false,
          tabBarIcon: ()=>{
            return <Ionicons name="calendar-number-outline"
            size='24'/>
          }
        }}
          />
          <Tab.Screen name="Food" component={FoodScreen}
            options={{ title: 'Food',
              headerShown: false,
              tabBarIcon: ()=>{
            return <Ionicons name="fast-food-outline"
            size='24' />
            
          }
            }}
          />
          <Tab.Screen name="Saved" 
            component={SavedScreen}
            options={{ title: 'Saved',
              headerShown: false,
              tabBarIcon: ()=>{
            return <Ionicons name="bookmark-outline"
            size='24'/>
          }
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
