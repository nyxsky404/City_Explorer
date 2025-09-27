import {View,Text,FlatList, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockFood } from '../data/foodData.js';

const FoodScreen = () => {
    console.log("Rendering foods")

  const renderFoodData = ({ item }) => (
<View>
      <View>
        <Text>{item.title}</Text>
      </View>
      
      <View>
    <Text>{item.cuisine}</Text>
        <Text>{item.priceRange}</Text>
        <Text>⭐ {item.rating}</Text>
      </View>
      
      <Text>📍 {item.location}</Text>

      <Text>🕒 {item.hours}</Text>
      <Text numberOfLines={2}>
        {item.description}</Text>
    </View>
  );

  return (
<SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Food & Dining</Text>
        <Text style={styles.subheading}>Discover great restaurants in your city</Text>
      </View>
      
      <FlatList data={mockFood} renderItem={renderFoodData}keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: "grey",
    borderBottomWidth: 1,
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
  }})

export default FoodScreen;