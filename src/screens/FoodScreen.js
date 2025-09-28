import {View,Text,FlatList, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockFood } from '../data/foodData.js';

const FoodScreen = () => {
    console.log("Rendering foods")

  const renderFoodData = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.cardHeading}>
        <Text style={styles.title}>{item.title}</Text>

        <View>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
      
      <View>
        <Text style={styles.cuisine}>{item.cuisine}</Text>
      </View>
      
      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.hours}>🕒 {item.hours}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}</Text>

    </View>
  );

  return (
<SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Food & Dining</Text>
        <Text style={styles.subheading}>Discover great restaurants in your city</Text>
      </View>
      
      <FlatList data={mockFood} renderItem={renderFoodData} keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
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
  foodList: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

  },
  rating: {
    fontSize: 13,
    color: '#333',
  },
  cuisine: {
    fontSize: 14,
    color: 'black',
    margin: 4
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default FoodScreen;