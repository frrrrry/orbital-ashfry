import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Button } from "react-native-paper";
import { Link } from "expo-router";
import { useUserAuth } from "../../context/auth";
import { addUserProfile, getUser } from '../../firebase/firestore';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { firebase } from "../../firebase/firebase";
import nulluseravatar from "../../assets/nulluseravatar.png";
import { set } from 'date-fns';

export default function ProfilePage() {
  const { logOut, user } = useUserAuth();
  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ refreshing, setRefreshing ] = useState(false);

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

    let imageRef = firebase.storage().ref('/' + user.uid);
    if (imageRef) {
      imageRef
      .getDownloadURL()
      .then((url) => {
      setAvatarUrl(url); 
      })
      .catch((err) => console.log('getting downloadUrl of image error => ', err));
    }
  }, [isFocused]);

  /*
  // to delete image from firebase storage
  const deleteImage = () => {
    imageRef
    .delete()
    .then(() => {
      console.log(`${imageName}has been deleted successfully.`);
    })
    .catch((err) => console.log('error on image deletion => ', err));
  }
  */
 
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.title}>User Profile</Text>
      </View>
 
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity style={ styles.avatarContainer }>
          <Image 
            style={ styles.avatar } 
            source={{ uri : avatarUrl }}
          />
            {/*<AntDesign style={{ alignSelf: 'center' }} name="user" size={60} color="#8A8A8A"/>*/}
          </TouchableOpacity>
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
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  title: {  
    fontSize: 32,
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
    width: 100,
    height: 45,
    fontSize: 18,
  },
  display : {
    flexDirection: 'row',
    marginTop: 5,
    height: 50,
    width: 300,
    padding: 10,
    left: 20,
    top: 20,
  
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
