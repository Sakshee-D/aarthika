import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Configure the screen title */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      {/* Display error message */}
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
      
      {/* Link to the home screen */}
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
