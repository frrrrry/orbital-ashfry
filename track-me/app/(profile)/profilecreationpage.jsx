import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUserAuth } from "../../context/auth";
import { updateUserProfile } from '../../firebase/firestore';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from "../../firebase/firebase";
import nulluseravatar from "../../assets/nulluseravatar.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileCreationPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false); 
    const [errMsg, setErrMsg] = useState('');
    const { user } = useUserAuth();
    const router = useRouter();
    const isFocused = useIsFocused();

    useEffect(() => {
      const getValueFunction = async () => {
        // Function to get the value from AsyncStorage
        
        AsyncStorage.getItem('username').then(
          (value) => setUsername(value)); 

        AsyncStorage.getItem('bio').then(
          (value) => setBio(value));
      };
      getValueFunction();
  
    }, [isFocused]);

    const addImage = async () => {
        let img = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        console.log(JSON.stringify(img));
        
        if (!img.cancelled) {
            setImage(img.uri);
        }
    }
    
    const uploadImage = async (imageUri, avatarName) => {
        console.log(imageUri);

        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', imageUri, true);
          xhr.send(null);
        })
        const ref = firebase.storage().ref().child(avatarName)
        const snapshot = ref.put(blob);
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setImage(url)
              blob.close()
              return url
            })
          }
        )
    }

    const handleSave = async () => {
        setErrMsg('');
        
        try {
            if (image != '') {
                await uploadImage(image, user.uid);
            } else {
                const nullAvatar = Image.resolveAssetSource(nulluseravatar).uri; 
                await uploadImage(nullAvatar, user.uid);
            }
        } catch (error) {
            setErrMsg(error.message)
            console.log("error message: ", error.message);
            console.log("uid:", user.uid);
            console.log('error due to image');
        }

        try {
            await updateUserProfile(user.uid, username, bio, image);
        } catch (error) {
            setErrMsg(error.message)
            console.log("error message: ", error.message);
            console.log("uid:", user.uid);
            console.log('error due to text');
        }
        router.push("../(home)/profile");
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <View style={{ flex: 3 }}>
                <View style={{padding: 10, alignContent: 'center', alignSelf: 'center' }}>
                    <View style={ styles.imageContainer }>
                        { 
                            image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                        }
                        <View style={styles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                                <Text style={{ fontSize: 12, }}>{ image ? 'Edit' : 'Upload'} Image</Text>
                                <AntDesign name="camera" size={15} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <Text style={styles.body}>Username</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        // textContentType='userName'
                        value={username}
                        onChangeText={setUsername} />
                </View>

                <Text style={styles.body}>Bio</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        // textContentType='bio'
                        value={bio}
                        onChangeText={setBio} />
                </View>

                <View style={{ flexDirection:"row"  }}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.cancelContainer} 
                        onPress={() => {navigation.goBack();}}>
                        <Text style={ styles.setWhite }>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity></TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} style={styles.saveContainer} 
                        onPress={handleSave}>
                        <Text style={ styles.setWhite }>Save</Text>
                    </TouchableOpacity> 
          
                </View>

                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    imageContainer:{
        elevation:2,
        height:150,
        width:150,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    title: {  
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "left",
      top: 120,
    },
    body: {
        color: "#38434D",
        padding: 9
    },
    inputContainer : {
        flexDirection: 'row',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingBottom: 10,
    },
    input: {
        flex: 1
    },
    submitContainer: {
        top: 20,
        color: "#c5c5c5",
        width: 300,
        height: 45,
   },
    cancelContainer: {
        backgroundColor: "#c5c5c5",
        width: 140,
        height: 45,
        borderRadius: 20,
        top: 30, 
        alignItems: 'center',
        justifyContent: 'center',
  },
    saveContainer: {
        backgroundColor: "#c5c5c5",
        width: 140,
        height: 45,
        borderRadius: 20,
        top: 30, 
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
  },
    setWhite: {
        color:'white',
        fontSize: 14,
        textAlign:"center"
  },
});