import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useUserAuth } from "../../context/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUser } from '../../firebase/firestore';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function ProfilePage() {
  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const [showUser, setShowUser] = useState([]);
  
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
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>User Profile</Text>
      </View>
 
      <View style={{ flex: 1 }}>
        <View>
          <Ionicons style={{ alignSelf: 'center' } } name="ios-person-circle-outline" size={100} color={'black'}/>
        
        </View>

        <View style={ styles.display }>
          <Text style={styles.subtitle}>
            username: 
          </Text>
          <Text>
          {showUser.map((user) => (
            <Text style={styles.displayText} 
            key={showUser.id}>{user.username}</Text>
          ))}
          </Text>
        </View>
        
        <View style={ styles.display }>
          <Text style={styles.subtitle}>
            bio: 
          </Text>
          <Text>
          {showUser.map((user) => (
            <Text style={styles.displayText} 
            key={showUser.id}>{user.bio}</Text>
          ))}
          </Text>
        </View>

      </View>

      <View style={{ flex: 0.7 }}>
        <StatusBar style="auto" />

        <Button onPress={handleLogout} 
                  mode="contained" buttonColor="#c5c5c5" style={ styles.signoutButton }>
                      Sign out</Button>
        <View style={styles.profileContainer}>
          <Link href="../(profile)/profilecreationpage">
            <Text style={styles.editprofileContainer}>Edit Profile</Text>
          </Link>
        </View>
        
      </View>
      
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {  
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
    top: 140,
  },
  subtitle : {
    width: 120,
    height: 45,
    fontSize: 18,
    color: "#8A8A8A",
  },
  displayText : {
    width: 120,
    height: 45,
    fontSize: 18,
  },
    display : {
      flexDirection: 'row',
      height: 40,
      width: 300,
      padding: 10,
      left: 20,
      top: 20
  },
  signoutButton: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 140,
    height: 45,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    top: 15
   },
  editprofileContainer: {
    color:'#8A8A8A',
    textAlign: 'center',
   }
});
