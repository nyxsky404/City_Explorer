import {View,Text,FlatList, StyleSheet} from 'react-native';
import { mockEvents } from '../data/eventsData';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventsScreen = () => {

    console.log("rendering events")

  const renderEventData = ({ item }) => (
    <View>
      <View>
        <Text>{item.title}</Text>
      </View>
      
      <Text>{item.category}</Text>
      <Text>{item.date} • {item.time}</Text>
      <Text>📍 {item.location}</Text>
      <Text numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>City Events</Text>
        <Text style={styles.subheading}>Discover what's happening in your city</Text>
      </View>
      
      <FlatList data={mockEvents} renderItem={renderEventData}keyExtractor={(item) => item.id}
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

export default EventsScreen;