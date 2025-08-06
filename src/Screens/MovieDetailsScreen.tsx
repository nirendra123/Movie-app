import { Text, View } from 'react-native';
import React from 'react';

const MovieDetailsScreen = ({ route }: any) => {
  const { item } = route.params;
  return (
    <View>
      <View>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
};

export default MovieDetailsScreen;

// const styles = StyleSheet.create({});
