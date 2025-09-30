import {View,Text,FlatList, StyleSheet} from 'react-native';
import { mockEvents } from '../data/eventsData';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventsScreen = () => {

    console.log("rendering events")

  const renderEventData = ({ item }) => (
    <View style={styles.card}>

      <View style={styles.cardHeading}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Text 
          style={styles.category}>{item.category}</Text>
        </View>
      </View>
      
      <View>

        <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
      </View>

      
      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>



    </View>
  );

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Events</Text>
        <Text style={styles.subheading}>Discover what's happening in your city</Text>
      </View>
      
      <FlatList data={mockEvents}renderItem={renderEventData}keyExtractor={(item) => item.id}
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
  category: {
    fontSize: 12,
    // color: '#007AFF',
    // backgroundColor: '#E3F2FD',
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    // borderRadius: 12,
  },
  dateTime: {
    fontSize: 14,
    color: 'black',
    margin: 4
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
});

export default EventsScreen;