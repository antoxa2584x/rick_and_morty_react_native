import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';

interface NavigationBarProps {
  image?: string | null;
  text?: string | null;
}

export function NavigationBar(props: NavigationBarProps | any) {
  const getCenterView = () => {
    if (props.text != null) {
      return <Text>{props.text}</Text>;
    }
    if (props.image != null) {
      return (
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={props.image}
        />
      );
    }
  };

  return (
    <View style={styles.progress}>
      <StatusBar backgroundColor={'black'} translucent={false} />
      <SafeAreaView />
      <View style={styles.centerViewContainer}>{getCenterView()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    height: 56,
    backgroundColor: 'black',
  },
  image: {height: '80%', width: '60%'},
  centerViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
