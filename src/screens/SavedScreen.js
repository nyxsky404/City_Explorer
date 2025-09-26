import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Saved Items</Text>
        <Text style={styles.subheading}>
          Favorites feature coming soon!
        </Text>
      </View>
      
      <View style={styles.main}>
        <Text style={styles.emoji}>💝</Text>
        <Text style={styles.title}>Favorites Coming Soon</Text>
        <Text style={styles.text2}>
          This feature will allow you to save your favorite events and restaurants!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: '#e0e0e0',
  },
  heading: {
    color: '#333333',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 16,
    color: '#666666',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 7,
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SavedScreen;