import {ActivityIndicator, StyleSheet} from 'react-native';
import * as React from 'react';

export function ProgressView() {
  return <ActivityIndicator style={styles.progress} size={'large'} />;
}

const styles = StyleSheet.create({
  progress: {padding: 8},
});
