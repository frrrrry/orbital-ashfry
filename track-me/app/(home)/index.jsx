import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text } from "react-native-paper";
import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../../context/auth";
import { useIsFocused } from '@react-navigation/native';
import { getUser } from '../../firebase/firestore';
import { SubwalletReminders } from '../components/SubwalletReminders';
import { getWallet } from '../../firebase/firestore';

export default function App() {
  const { user } = useUserAuth();
  const [dateState, setDateState] = useState(new Date());
  const [username, setUsername] = useState('')

  // update date every 30s 
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  
  // to auto update the username and bio
  const isFocused = useIsFocused();

  // get data from firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getUser(user.uid);
        setUsername(result[0].username);
      } catch (error) {
        // if no such uid exists
        console.log("getUser error in index:", error);
      }
    };
    loadData();
  }, [isFocused]);

  // get wallets data from firebase
  const [wallets, setWallets] = useState([]);
  const isFocusedWallet = useIsFocused();

  useEffect(() => {
    const loadData = async () => {
      try{ 
        const result = await getWallet(user.uid);
        setWallets(result);  
      } catch (error) {
        console.log("getWallet error in index", error); 
      }
    };
    loadData();
  }, [isFocusedWallet]);

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <View>
          <Text style={ styles.title }>
            Welcome,  
          </Text>
        </View>
        <View >
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {dateState.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
      <SubwalletReminders wallets={wallets} style={styles.flatListContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    top: 100,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
    //top: 100,
  },
  title: {
    fontSize: 32, 
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'flex-start',
  },  
  username: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'flex-end',
  },
  dateContainer: {
    flex: 1,
    // justifyContent: 'flex-start'
  },  
  date: {
    fontSize: 18, 
  },
  flatListContainer: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }, 
});