import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockFood } from '../data/foodData.js';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ForYouSection from '../components/ForYouSection';
import { usePersonalization } from '../context/PersonalizationContext';

const FoodScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { trackViewedItem } = usePersonalization();


  const categories = useMemo(() => {
    const uniqueCuisines = [...new Set(mockFood.map(item => item.cuisine))];
    return uniqueCuisines.map(cuisine => ({
      label: cuisine.replace(/[^\w\s]/g, '').trim(),
      value: cuisine.replace(/[^\w\s]/g, '').trim(),
      icon: cuisine.match(/[^\w\s]/g)?.[0] || '🍽️'
    }));
  }, []);


  const filteredFood = useMemo(() => {
    return mockFood.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || item.cuisine.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleItemPress = (item) => {
    trackViewedItem(item);
    trackViewedItem(item);
    if (navigation) {
      navigation.navigate('FoodDetail', { restaurant: item });
      console.log('Navigate to food detail:', item.id);
    }
  };

  const renderFoodData = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
    >
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
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Food & Dining</Text>
        <Text style={styles.subheading}>Discover great restaurants in your city</Text>
      </View>

      <SearchBar
        searchText={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search restaurants, cuisines..."
        onFilterPress={() => { }}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        type="food"
      />

      <FlatList
        data={filteredFood}
        renderItem={renderFoodData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
        ListHeaderComponent={
          !searchQuery && !selectedCategory ? (
            <ForYouSection
              allItems={mockFood}
              itemType="food"
              onItemPress={handleItemPress}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No restaurants found matching your criteria</Text>
          </View>
        }
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
    paddingBottom: 10,
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
    paddingTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginVertical: 4
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
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FoodScreen;