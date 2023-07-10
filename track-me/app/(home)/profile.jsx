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
import { connectStorageEmulator } from 'firebase/storage';

export default function ProfilePage() {
  const nullAvatar = Image.resolveAssetSource(nulluseravatar).uri; 
  const { logOut, user } = useUserAuth();
  const [ avatarUrl, setAvatarUrl ] = useState(nullAvatar);
  const [ refresh, setRefresh ] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      
    } catch (error) {
      console.log("logout error", error.message);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefresh(true);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('');
  
  //to auto update the username and bio
  //const isFocused = useIsFocused();

  //get data from firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getUser(user.uid);
        setUsername(result[0].username);
        setBio(result[0].bio);
      } catch (error) {
        console.log("getUser error in profile:", error);
      }
    };

    let imageRef = firebase.storage().ref('/' + user.uid);
    if (imageRef) {
      imageRef
      .getDownloadURL()
      .then((url) => {
      setAvatarUrl(url); 
      })
      .catch((err) => console.log('getting downloadUrl of image error => ', err));
    } 

    loadData();
    setRefresh(false);
  }, [refresh]);
  
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
      <View style={{ flex: 0.8, top: -40 }}>
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
          <Text style={styles.subtitle}>Username: </Text>
          <Text style={styles.displayText}>{username}</Text>
        </View>
        
        <View style={ styles.display }>
          <Text style={styles.subtitle}>
            Bio: 
          </Text>
          <Text style={styles.displayText}>{bio}</Text>
        </View>

      </View>

      <View style={{ flex: 0.7 }}>
      
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.refreshContainer}>Refresh</Text>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Link href="../(profile)/profilecreationpage">
            <Text style={styles.editprofileContainer}>Edit Profile</Text>
          </Link>
        </View>

        <Button onPress={handleLogout} 
                  mode="contained" buttonColor="#c5c5c5" style={ styles.signoutButton }>
                      Sign out</Button>
        
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
    width: 140,
    height: 140,
    backgroundColor: "#E1E2E6",
    borderRadius: 70,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    top: -40, 
  },
  avatar: {
    position: 'absolute',
    width: 140,
    height: 140,
    backgroundColor: "#E1E2E6",
    borderRadius: 70,
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
    top: -20,
  },
  signoutButton: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 140,
    height: 45,
    top: 10,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
    top: 0,
    backgroundColor: "#c5c5c5",
    height: 45,
    borderRadius: 20, 
   },
  editprofileContainer: {
    color:'#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14, 
   },
  refreshContainer: {
    color:'#8A8A8A',
    textAlign: 'center',
    top: -15
   }
});
