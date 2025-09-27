import {View,Text,FlatList} from 'react-native';
import { mockEvents } from '../data/eventsData';

const EventsScreen = () => {

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
    <View>
      <View>
        <Text>City Events</Text>
        <Text>Discover what's happening in your city</Text>
      </View>
      
      <FlatList data={mockEvents} renderItem={renderEventData}keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default EventsScreen;