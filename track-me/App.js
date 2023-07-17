import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FrontPage from './app/(auth)/frontpage';

// export default FrontPage(); 

export default function App() {
  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
