import React from 'react';
import {View} from 'react-native';
import CardDetails from './Cards';

export default function CardListInfo({allEvents}) {
  return (
    <View>
      {allEvents.map((event, index) => (
        <CardDetails event={event} key={event._id} />
      ))}
    </View>
  );
}
