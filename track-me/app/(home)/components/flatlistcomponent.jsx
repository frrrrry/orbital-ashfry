import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";

const DATA = [
    {
      id: '1',
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
  ];

const Item = ({ item, title, id, onPress, backgroundColor }) => {
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
};

export function FlatListComponent() {
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "c5c5c5" : "8a8a8a";

        return (
            <Item 
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                horizontal
            />    
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      // backgroundColor: "#E1E2E6",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      // height: 100,
      // width: 100,
    },
    title: {
      fontSize: 18,
    },
    button: {
      flex: 1,
      color: "8a8a8a",
    },
});