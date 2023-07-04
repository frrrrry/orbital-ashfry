import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SubwalletPage() {

  return (
    <View style={styles.container}>
      <Text>Sub Wallet</Text>
      <StatusBar style="auto" />

      <View style={{ alignSelf: 'flex-end', position: "absolute", bottom: 0 } } >
        <Link href="../(subwallet)/addwalletpage">
          <Ionicons name="ios-add-circle" size={65} color={'black'} />
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
