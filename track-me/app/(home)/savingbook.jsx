import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from "expo-router";

export default function SavingBookPage() {
  return (
    <View style={styles.container}>
      <Text>Saving Book</Text>
      <StatusBar style="auto" />
      
      <View style={{ alignSelf: 'flex-end', position: "absolute", bottom: 0 } } >
        <Link href="../(savingbook)/addtransactionpage">
          <Ionicons name="ios-add-circle" size={60} color={'black'}/>
        </Link>
      </View>
      
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
