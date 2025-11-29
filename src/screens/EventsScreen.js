import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mockEvents } from '../data/eventsData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FilterModal from '../components/FilterModal';
import { useLocation } from '../context/LocationContext';

const EventsScreen = ({ navigation }) => {
  const { currentCity } = useLocation();
  console.log('Current City:', currentCity);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRanges: [],
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
    if (activeFilters.accessibility?.length > 0) count += activeFilters.accessibility.length;
    return count;
  };



  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockEvents.map(item => item.category))];

    const getCategoryIcon = (categoryName) => {
      if (categoryName.includes('Music')) return 'musical-notes';
      if (categoryName.includes('Art')) return 'color-palette';
      if (categoryName.includes('Food')) return 'restaurant';
      if (categoryName.includes('Entertainment')) return 'film';
      if (categoryName.includes('Shopping')) return 'cart';
      return 'calendar';
    };

    return uniqueCategories.map(category => ({
      label: category.replace(/[^\w\s]/g, '').trim(),
      value: category.replace(/[^\w\s]/g, '').trim(),
      icon: getCategoryIcon(category)
    }));
  }, []);


  const filteredEvents = useMemo(() => {
    return mockEvents.filter(item => {
      // 0. Filter Past Events
      const eventDate = new Date(item.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        return false;
      }

      // Filter by City
      if (item.city !== currentCity) {
        return false;
      }

      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || item.category.includes(selectedCategory);

      const matchesPrice = activeFilters.priceRanges.length === 0 ||
        (item.price === 0 && activeFilters.priceRanges.includes('Free')) ||
        (item.price > 0 && item.price < 500 && activeFilters.priceRanges.includes('₹')) ||
        (item.price >= 500 && item.price <= 1500 && activeFilters.priceRanges.includes('₹₹')) ||
        (item.price > 1500 && activeFilters.priceRanges.includes('₹₹₹'));

      // Note: Mock data might not have accessibility fields, so we'll skip strict checking for now
      // or assume true if no specific accessibility data exists to avoid filtering everything out.
      // If data existed: const matchesAccess = activeFilters.accessibility.every(filter => item.features?.includes(filter));
      const matchesAccess = true;

      return matchesSearch && matchesCategory && matchesPrice && matchesAccess;
    });
  }, [searchQuery, selectedCategory, activeFilters]);

  const handleItemPress = (item) => {

    if (navigation) {
      navigation.navigate('EventDetail', { event: item });

    }
  };

  const renderEventData = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{new Date(item.date).getDate()}</Text>
          <Text style={styles.monthText}>{new Date(item.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.location} numberOfLines={1}>{item.location}</Text>
          <Text style={styles.price}>{item.price === 0 ? 'Free' : `₹${item.price}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Events in {currentCity}</Text>
        <Text style={styles.subheading}>Discover what's happening nearby</Text>
      </View>

      <SearchBar
        searchText={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search events, categories..."
        onFilterPress={handleFilterPress}
        filterCount={getActiveFilterCount()}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        type="events"
      />

      <FlatList
        data={filteredEvents}
        renderItem={renderEventData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
        ListHeaderComponent={
          !searchQuery && !selectedCategory ? null : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events found matching your criteria</Text>
          </View>
        }
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={activeFilters}
        onApply={handleApplyFilters}
        type="event"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background
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
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(10px)', // Note: backdropFilter might not work on all RN versions without extra libs, but rgba is safe
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBadge: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 60,
    height: 60,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
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

export default EventsScreen;