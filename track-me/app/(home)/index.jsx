import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text, Button } from "react-native-paper";
import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../../context/auth";
import { useIsFocused } from '@react-navigation/native';
import { getUser } from '../../firebase/firestore';
import { FlatListComponent } from './components/flatlistcomponent';
import { auth } from '../../firebase/firebase'

export default function App() {
  const { user } = useUserAuth();
  const [showUser, setShowUser] = useState([]);
  const [dateState, setDateState] = useState(new Date());

  // update date every 30s 
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  
  //to auto update the username and bio
  const isFocused = useIsFocused();

  //get data from firebase
  useEffect(() => {
    const loadData = async () => {
      const result = await getUser(user.uid);
      setShowUser(result);
    };
    loadData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <View>
          <Text style={ styles.title }>
            Welcome,  
          </Text>
        </View>
        <View >
          <Text style={styles.username}>
            {showUser.map((user) => (
              <Text style={styles.displayText} 
              key={showUser.id}>{user.username}</Text>
            ))}
          </Text>
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
      <View style={styles.flatListContainer}>
          <FlatListComponent />
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
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 100,
  },
  title: {
    fontSize: 28, 
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'flex-start',
  },  
  username: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'flex-end',
  },
  dateContainer: {
    flex: 2,
    // justifyContent: 'flex-start'
  },  
  date: {
    fontSize: 18, 
  },
  flatListContainer: {
    flex: 1,
  }, 
});
