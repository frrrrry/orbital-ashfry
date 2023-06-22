import React from "react"
import { SafeAreaView, View, FlatList, StyleSheet, Text, } from "react-native"

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First wallet\n(subwallet reminders to be implemented in ms3)',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second wallet',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third wallet',
  },
];

const Item = ({ title, id }) => (
  <View key={id} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

export const FlatListComponent = () => {
  const renderItem = ({ item }) => (
    <Item id={item.id} title={item.title} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#c5c5c5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 170,
    width: 220,
    borderRadius: 20
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
  },
})
