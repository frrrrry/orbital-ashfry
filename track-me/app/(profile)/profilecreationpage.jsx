import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUserAuth } from "../../context/auth";
import { updateUserProfile } from '../../firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
// import UserPermissions from "./userpermissions";
// import UploadImage from "./uploadimage";
import { uploadPhotoAsync, uploadImage } from "../../firebase/storage";

export default function ProfileCreationPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const { user } = useUserAuth();
    const router = useRouter();

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
    };
    
    const handleSave = async () => {
        setErrMsg('');
        
        

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
                <Text style={styles.title}>User Profile</Text>
            </View>

            <View style={{ flex: 3 }}>
                <View style={{padding: 10, alignContent: 'center', alignSelf: 'center' }}>
                    <View style={ styles.imageContainer }>
                        { 
                            image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                        }
                        <View style={styles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                                <Text>{ image ? 'Edit' : 'Upload'} Image</Text>
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
      fontSize: 36,
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