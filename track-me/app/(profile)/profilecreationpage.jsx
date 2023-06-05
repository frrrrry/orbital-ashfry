import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileCreationPage() {
    // const [picture, setPicture] = useState((''));
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>User Profile</Text>
            </View>

            <View style={{ flex: 2.5 }}>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <View>
                        <Ionicons style={{ alignSelf: 'center' } } name="ios-person-circle-outline" size={100} color={'black'}/>
                    </View>
                    <Button textColor="#8a8a8a">upload profile picture</Button>
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
                <Link href="../(home)/profile">
                    <Button mode="contained" buttonColor="#c5c5c5" style={ styles.submitContainer }>
                        Save
                    </Button>
                </Link>
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
      top: 140,
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