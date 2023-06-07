import { StyleSheet, View, TextInput, Image } from "react-native";
import { useState } from "react";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUserAuth } from "../../context/auth";
import { updateUserProfile } from '../../firebase/firestore';
import { uploadImage } from '../../firebase/storage';

//not sure if this is correct
import * as ImagePicker from 'expo-image-picker';

export default function ProfileCreationPage() {
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { user } = useUserAuth();
    const router = useRouter();

    // this part is to allow user to pic image -> not sure if correct 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        console.log(result);
        const imagelink = result.assets[0].uri;

        if (!result.canceled) {
            setImage(imagelink);
            console.log(image);
        }
    }; 
    
    const handleSave = async () => {
        setErrMsg('');

        // this part is to upload image to firebase storage -> but i keep getting error
        // error message shown -> Property 'format' doesn't exist
        try {
            await uploadImage(image, user.uid);
        } catch (err) {
            setErrMsg(err.message)
            console.log("error message: ", err.message);
            console.log("uid:", user.uid);
            console.log('error due to image');
        }

    
        try {
            await updateUserProfile(user.uid, username, bio);
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

            <View style={{ flex: 2.5 }}>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <View>
                    {image 
                        ? <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: "center" }} />
                        : <Ionicons style={{ alignSelf: 'center' } } name="ios-person-circle-outline" size={100} color={'black'}/>
                        }

                    </View>

                    <Button onPress={pickImage} textColor="#8a8a8a">upload profile picture</Button>
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
                <View style={{ top: 20 }}>
                    <Button onPress={handleSave} 
                    mode="contained" buttonColor="#c5c5c5" style={ styles.submitContainer }>
                        Save
                    </Button>
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
   }
});