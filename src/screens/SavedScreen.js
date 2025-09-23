import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SavedScreen = () => {

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text>Saved Items</Text>
        <Text>Favorites feature coming soon!</Text>
      </View>
      

      <View>
        <Text>💝</Text>
        <Text>Favorites Coming Soon</Text>
        <Text>This feature will allow you to save your favorite events and restaurants!</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
})
export default SavedScreen;