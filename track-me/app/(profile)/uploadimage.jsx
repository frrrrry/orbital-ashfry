import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from "./userpermissions";

export default function UploadImage() {
    UserPermissions(); 

    const [image, setImage] = useState(null);

    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));

        if (!_image.cancelled) {
            setImage(_image.uri);
        }
    };

    return (
        <View style={styles.container}>
            {
                image  && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
            }
                <View style={styles.uploadBtnContainer}>
                    <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                        <AntDesign name="camera" size={15} color="black" />
                    </TouchableOpacity>
                </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container:{
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
    }
});
