import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { mockEvents } from '../data/eventsData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FilterModal from '../components/FilterModal';

const EventsScreen = ({ navigation }) => {
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
      console.log('Navigate to event detail:', item.id);
    }
  };

  const renderEventData = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.cardHeading}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
      </View>

      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Events</Text>
        <Text style={styles.subheading}>Discover what's happening in your city</Text>
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
  category: {
    fontSize: 12
  },
  dateTime: {
    fontSize: 14,
    color: 'black',
    marginVertical: 4
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
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

export default EventsScreen;