import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { mockEvents } from '../data/eventsData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ForYouSection from '../components/ForYouSection';
import { usePersonalization } from '../context/PersonalizationContext';

const EventsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { trackViewedItem } = usePersonalization();


  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockEvents.map(item => item.category))];
    return uniqueCategories.map(category => ({
      label: category.replace(/[^\w\s]/g, '').trim(),
      value: category.replace(/[^\w\s]/g, '').trim(),
      icon: category.match(/[^\w\s]/g)?.[0] || '📅'
    }));
  }, []);


  const filteredEvents = useMemo(() => {
    return mockEvents.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || item.category.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleItemPress = (item) => {
    trackViewedItem(item);
    trackViewedItem(item);
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
        onFilterPress={() => { }}
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
          !searchQuery && !selectedCategory ? (
            <ForYouSection
              allItems={mockEvents}
              itemType="events"
              onItemPress={handleItemPress}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events found matching your criteria</Text>
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