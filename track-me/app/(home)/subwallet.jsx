import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserAuth } from '../../context/auth';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getWallet } from '../../firebase/firestore';
import Wallet from '../(subwallet)/wallets'

export default function SubwalletPage() {
  const { user } = useUserAuth();
  const [wallets, setWallets] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadData = async () => {
      const result = await getWallet(user.uid);
      setWallets(result);
    };
    loadData();
  }, [isFocused]);

  // console.log('subwalletpage', wallets); 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Wallet wallets={wallets}/>
      </SafeAreaView>
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
