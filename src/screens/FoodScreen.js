import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockFood } from '../data/foodData.js';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FilterModal from '../components/FilterModal';
import { useLocation } from '../context/LocationContext';

const FoodScreen = ({ navigation }) => {
  const { currentCity } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRanges: [],
    dietary: [],
    accessibility: []
  });

  const handleFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.priceRanges?.length > 0) count += activeFilters.priceRanges.length;
    if (activeFilters.dietary?.length > 0) count += activeFilters.dietary.length;
    if (activeFilters.accessibility?.length > 0) count += activeFilters.accessibility.length;
    return count;
  };



  const categories = useMemo(() => {
    const uniqueCuisines = [...new Set(mockFood.map(item => item.cuisine))];

    const getCuisineIcon = (cuisineName) => {
      if (cuisineName.includes('Italian')) return 'pizza';
      if (cuisineName.includes('Japanese')) return 'fish';
      if (cuisineName.includes('Mexican')) return 'flame';
      if (cuisineName.includes('American')) return 'fast-food';
      return 'restaurant';
    };

    return uniqueCuisines.map(cuisine => ({
      label: cuisine.replace(/[^\w\s]/g, '').trim(),
      value: cuisine.replace(/[^\w\s]/g, '').trim(),
      icon: getCuisineIcon(cuisine)
    }));
  }, []);


  const filteredFood = useMemo(() => {
    return mockFood.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by City
      if (item.city !== currentCity) {
        return false;
      }

      const matchesCategory = !selectedCategory || item.cuisine.includes(selectedCategory);

      const matchesPrice = activeFilters.priceRanges.length === 0 ||
        activeFilters.priceRanges.includes(item.priceRange);

      // Mock data might not have dietary/accessibility fields populated for all items
      // For now, we'll assume true if data is missing to avoid empty lists
      const matchesDietary = activeFilters.dietary.length === 0 ||
        (item.dietary && activeFilters.dietary.some(filter => item.dietary.includes(filter)));

      const matchesAccess = true; // Placeholder for accessibility check

      return matchesSearch && matchesCategory && matchesPrice && matchesDietary && matchesAccess;
    });
  }, [searchQuery, selectedCategory, activeFilters]);

  const handleItemPress = (item) => {

    if (navigation) {
      navigation.navigate('FoodDetail', { restaurant: item });

    }
  };

  const renderFoodData = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating} ★</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cuisine} numberOfLines={1}>{item.cuisine} • {item.priceRange}</Text>
          <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
        </View>

        <View style={styles.costContainer}>
          <Text style={styles.costText}>₹{item.averageCost}</Text>
          <Text style={styles.forTwoText}>for two</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Food in {currentCity}</Text>
        <Text style={styles.subheading}>Discover great restaurants nearby</Text>
      </View>

      <SearchBar
        searchText={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search restaurants, cuisines..."
        onFilterPress={handleFilterPress}
        filterCount={getActiveFilterCount()}
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
          !searchQuery && !selectedCategory ? null : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No restaurants found matching your criteria</Text>
          </View>
        }
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={activeFilters}
        onApply={handleApplyFilters}
        type="food"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    backgroundColor: '#121212',
    paddingBottom: 10,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 5,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  foodList: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#266E3F', // Green rating box
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#888888',
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forTwoText: {
    fontSize: 12,
    color: '#888888',
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